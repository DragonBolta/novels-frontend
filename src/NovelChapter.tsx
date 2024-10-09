import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

interface NovelInfo {
    _id: {
        $oid: string;
    };
    title: string;
    source: string;
    tags: string[];
    author: string;
    description: string;
    first_chapter_link: string;
    rating: number;
    likes: number;
    source_english: string;
    title_english: string;
    description_english: string;
}

function sanitizeFilename(filename: string) {
    // Windows invalid characters for filenames: <>:"/\|?*
    const invalidChars = /[<>:"/\\|?*]/g;
    // Replace invalid characters with an underscore or another placeholder
    return filename.replace(invalidChars, '');
}

const NovelChapter: React.FC = () => {
    // Extracting the route parameters
    const { novelName, chapterNumber } = useParams<{ novelName: string; chapterNumber: string }>();

    const [novelInfo, setNovelInfo] = useState<NovelInfo>();
    const [content, setContent] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTitle = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/${novelName}/`)
                setNovelInfo(response.data[0])
            } catch (err: unknown) {
                if (typeof err === 'object' && err !== null && 'response' in err) {
                    const errorResponse = err as { response: { data: { error: string } } };
                    setError(errorResponse.response.data.error || 'Failed to fetch the proper title');
                } else {
                    setError('Failed to fetch the proper title');
                }
            }
        }
        fetchTitle().then();
    }, [novelName])
    useEffect(() => {
        const fetchChapter = async () => {
            try {
                // Make an API request to fetch the chapter content
                const response = await axios.get(`http://localhost:3000/api/${novelName ? sanitizeFilename(novelName) : ""}/${chapterNumber}`);
                console.log(response.data)
                setContent(response.data.content);
            } catch (err: unknown) {
                if (typeof err === 'object' && err !== null && 'response' in err) {
                    const errorResponse = err as { response: { data: { error: string } } };
                    setError(errorResponse.response.data.error || 'Failed to fetch the chapter');
                } else {
                    setError('Failed to fetch the chapter');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchChapter().then();
    }, [novelName, chapterNumber]); // Dependencies to refetch if params change

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>{novelInfo ? novelInfo["title_english"] : ""} - Chapter {chapterNumber}</h1>
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
};

export default NovelChapter;

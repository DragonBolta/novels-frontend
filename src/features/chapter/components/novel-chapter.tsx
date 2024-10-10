import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import {NovelInfo} from '@/types/api.ts';
import {useNovelInfo, NovelInfoProps} from "@/hooks/use-novel-info.ts";

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

    useNovelInfo({novelName, setNovelInfo, setError} as NovelInfoProps);

    useEffect(() => {
        const fetchChapter = async () => {
            try {
                // Make an API request to fetch the chapter content
                const response = await axios.get(`http://localhost:3000/api/${novelName ? sanitizeFilename(novelName) : ""}/${chapterNumber}`);
                console.log(response.data)
                setContent(response.data.content);
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    // This check ensures that err is an Axios error
                    setError(err.response?.data?.error || 'Failed to fetch the chapter');
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

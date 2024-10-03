import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const NovelChapter: React.FC = () => {
    // Extracting the route parameters
    const { novelName, chapterNumber } = useParams<{ novelName: string; chapterNumber: string }>();

    const [content, setContent] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchChapter = async () => {
            try {
                // Make an API request to fetch the chapter content
                const response = await axios.get(`http://localhost:3000/api/${novelName}/${chapterNumber}`);
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
            <h1>{novelName} - Chapter {chapterNumber}</h1>
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
};

export default NovelChapter;

import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

const ToC: React.FC = () => {
    const { novelName } = useParams<{ novelName: string }>();

    const [chapterList, setChapterList] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null); // Added state for error handling

    useEffect(() => {
        const fetchChapterList = async ()=> {
            try {
                const response = await axios.get(`http://localhost:3000/api/${novelName}/chapterlist`);
                setChapterList(response.data["chapters"]);
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    // This check ensures that err is an Axios error
                    setError(err.response?.data?.error || 'Failed to fetch the chapter list');
                } else {
                    setError('Failed to fetch the chapter list');
                }
            }
        }
        fetchChapterList().then();
    }, [novelName]);
    return (
        <>
            <div className="flex flex-col justify-center w-full h-full">
                {error && <p className="text-red-500">{error}</p>} {/* Error message display */}
                {chapterList.map((chapter, index) => (
                    <a
                        key={index}
                        href={`http://localhost:5173/novel/${encodeURIComponent(novelName ? novelName : "")}/chapter/${index}`} // Construct URL here
                    >
                        {chapter}
                    </a>
                ))}
            </div>
        </>
    );
}

export default ToC;
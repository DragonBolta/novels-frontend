import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {NovelInfo} from "@/types/api.ts";
import {NovelInfoProps, useNovelInfo} from "@/hooks/use-novel-info.ts";

const ChapterList: React.FC<{ chapters: string[], novelName: string }> = ({ chapters, novelName }) => {
    return (
        <div className="chapter-list flex flex-col">
            {chapters.map((chapter, index) => (
                <a
                    key={index}
                    href={`http://localhost:5173/novel/${encodeURIComponent(novelName)}/chapter/${index}`}
                >
                    {chapter}
                </a>
            ))}
        </div>
    );
};

const ToC: React.FC = () => {
    const { novelName } = useParams<{ novelName: string }>();

    const [novelInfo, setNovelInfo] = useState<NovelInfo>();
    const [chapterList, setChapterList] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null); // Added state for error handling

    useNovelInfo({novelName, setNovelInfo, setError} as NovelInfoProps);

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
            <div>{novelInfo ? novelInfo["title_english"] : ""}</div>
            <div className="flex flex-col justify-center w-full h-full">
                {error && <p className="text-red-500">{error}</p>} {/* Error message display */}
                <ChapterList chapters={chapterList} novelName={novelName || ""} />
            </div>
        </>
    );
}

export default ToC;
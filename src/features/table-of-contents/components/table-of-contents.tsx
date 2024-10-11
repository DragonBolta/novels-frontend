import React from 'react';
import {useParams} from "react-router-dom";
import {NovelInfo} from "@/types/api.ts";
import {useNovelInfo} from "@/hooks/use-novel-info.ts";
import {useChapterList} from "@/features/table-of-contents/components/api/get-chapter-list.ts";

const ChapterList = ({ novelName }: { novelName: string }) => {
    const chapterListQuery = useChapterList({novelName});

    if (chapterListQuery.isLoading) return <div>Loading...</div>;
    if (chapterListQuery.isError) return <div>Error: {chapterListQuery.error.message}</div>;

    const chapterList = chapterListQuery?.data;

    if (!chapterList) return null;

    return (
        <div className="chapter-list flex flex-col">
            {chapterList.map((chapter, index) => (
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
    const { novelName = ""} = useParams<{ novelName: string }>();

    const novelInfo: NovelInfo | undefined = useNovelInfo({novelName}).data;

    return (
        <>
            <div>{novelInfo ? novelInfo["title_english"] : ""}</div>
            <div>{novelInfo ? novelInfo["description_english"] : ""}</div>
            <div className="flex flex-col justify-center w-full h-full">
                <ChapterList novelName={novelName || ""} />
            </div>
        </>
    );
}

export default ToC;
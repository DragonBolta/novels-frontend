import React from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {NovelInfo} from '@/types/api.ts';
import {useNovelInfo} from "@/hooks/use-novel-info.ts";
import {useChapter} from "@/features/chapter/components/api/get-chapter.ts";

const NovelChapter: React.FC = () => {
    // Extracting the route parameters
    const { novelName = "", chapterNumber = "0"} = useParams<{ novelName: string; chapterNumber: string }>();

    const novelInfoQuery = useNovelInfo({novelName});

    const chapterQuery = useChapter({novelName: novelName, chapterNumber: Number(chapterNumber)})

     // Dependencies to refetch if params change

    if (chapterQuery.isLoading) return <div>Loading...</div>;
    if (chapterQuery.isError) return <div>Error: {chapterQuery.error.message}</div>;

    const novelInfo: NovelInfo | undefined = novelInfoQuery.data;

    const content: string | undefined = chapterQuery.data;

    return (
        <div className={"mx-8"}>
            <h1>{novelInfo ? novelInfo["title_english"] : ""} - Chapter {chapterNumber}</h1>
            <ReactMarkdown className={"flex flex-wrap"}>{content}</ReactMarkdown>
        </div>
    );
};

export default NovelChapter;

import React from 'react';
import HeaderBar from "@/components/ui/header.tsx";
import NovelChapter from "@/features/chapter/components/novel-chapter.tsx";

const ChapterLayout: React.FC = () => {

    return (
        <>
            <div className="flex flex-col items-center">
                <HeaderBar />
                <NovelChapter/>
            </div>
        </>
    );
}

export default ChapterLayout;
import React from 'react';
import NovelChapter from "@/features/chapter/components/novel-chapter.tsx";

const ChapterLayout: React.FC = () => {

    return (
        <>
            <div className="flex flex-col items-center">
                <NovelChapter/>
            </div>
        </>
    );
}

export default ChapterLayout;
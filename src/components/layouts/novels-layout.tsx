import React from 'react';
import NovelCardList from "@/features/novels/components/novel-card-list.tsx";

const NovelsLayout: React.FC = () => {

    return (
        <>
            <div className="flex flex-col items-center">
                <h1>Novels</h1>
                <NovelCardList />
            </div>
        </>
    );
}

export default NovelsLayout;
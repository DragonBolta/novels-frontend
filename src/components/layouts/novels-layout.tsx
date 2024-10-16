import React from 'react';
import NovelCardList from "@/features/novels/components/novel-card-list.tsx";
import HeaderBar from "@/components/ui/header.tsx";

const NovelsLayout: React.FC = () => {

    return (
        <>
            <div className="flex flex-col items-center">
                <HeaderBar />
                <NovelCardList />
            </div>
        </>
    );
}

export default NovelsLayout;
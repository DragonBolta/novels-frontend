import React from 'react';
import HeaderBar from "@/components/ui/header.tsx";
import ToC from "@/features/table-of-contents/components/table-of-contents.tsx";

const NovelLayout: React.FC = () => {
    return (
        <>
            <div className="flex flex-col items-center">
                <HeaderBar />
                <ToC/>
            </div>
        </>
    );
}

export default NovelLayout;
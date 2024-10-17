import React from 'react';
import ToC from "@/features/table-of-contents/components/table-of-contents.tsx";

const NovelLayout: React.FC = () => {
    return (
        <>
            <div className="flex flex-col items-center">
                <ToC/>
            </div>
        </>
    );
}

export default NovelLayout;
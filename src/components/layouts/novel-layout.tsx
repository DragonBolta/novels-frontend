import React from 'react';
import ToC from "@/features/table-of-contents/components/table-of-contents.tsx";
import Comments from "@/features/comments/components/comments.tsx";
import {PageNovelInfoProvider} from "@/contexts/page-novelinfo.tsx";

const NovelLayout: React.FC = () => {
    return (
        <>
            <div className="flex flex-col items-center">
                <PageNovelInfoProvider>
                    <ToC/>
                    <Comments/>
                </PageNovelInfoProvider>
            </div>
        </>
    );
}

export default NovelLayout;
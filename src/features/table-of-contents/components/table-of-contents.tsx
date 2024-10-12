import React from 'react';
import {useParams} from "react-router-dom";
import NovelInfoDisplay from "@/features/table-of-contents/components/novel-info-display.tsx";
import ChapterList from "@/features/table-of-contents/components/chapter-list.tsx";

const ToC: React.FC = () => {
    const { novelName = ""} = useParams<{ novelName: string }>();

    return (
        <>
            <div className={"w-full p-4 md:p-0 md:w-8/12"}>
                <NovelInfoDisplay/>
                <div className="flex flex-col mt-4 md:mt-8 justify-center w-full h-full">
                    <ChapterList novelName={novelName || ""} />
                </div>
            </div>
        </>
    );
}

export default ToC;
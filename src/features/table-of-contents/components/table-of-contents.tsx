import React, {useContext} from 'react';
import NovelInfoDisplay from "@/features/table-of-contents/components/novel-info-display.tsx";
import ChapterList from "@/features/table-of-contents/components/chapter-list.tsx";
import {NovelInfo} from "@/types/api.ts";
import {PageNovelInfo} from "@/contexts/page-novelinfo.tsx";

const ToC: React.FC = () => {
    const novelInfo: NovelInfo | undefined = useContext(PageNovelInfo)?.novelInfo;

    if (!novelInfo) {
        return (<></>)
    }

    return (
        <>
            <div className={"w-full p-4 md:p-0 md:w-8/12"}>
                <NovelInfoDisplay />
                <div className="flex flex-col mt-4 md:mt-8 justify-center w-full h-full">
                    <ChapterList novelName={novelInfo.title_english || ""} />
                </div>
            </div>
        </>
    );
}

export default ToC;
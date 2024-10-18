import React, {createContext, ReactNode} from 'react';
import {useNovelInfo} from "@/hooks/use-novel-info.ts";
import {NovelInfo} from "@/types/api.ts";
import {useParams} from "react-router-dom";

type PageNovelInfoContext = {
    novelInfo?: NovelInfo;
}

const PageNovelInfo = createContext<PageNovelInfoContext | undefined>(undefined);

const PageNovelInfoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { novelName = "" } = useParams<{ novelName: string }>();

    const novelInfoQuery = useNovelInfo({ novelName });

    if (novelInfoQuery.isLoading) return <div>Loading...</div>;
    if (novelInfoQuery.isError) return <div>Error: {novelInfoQuery.error.message}</div>;

    const novelInfo: NovelInfo | undefined = novelInfoQuery.data;

    return (
        <PageNovelInfo.Provider value={{ novelInfo }}>
            {children}
        </PageNovelInfo.Provider>
    );
};

export { PageNovelInfo, PageNovelInfoProvider };
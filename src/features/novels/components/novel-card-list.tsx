import NovelCard from "@/features/novels/components/novel-card.tsx";
import {NovelInfo} from "@/types/api.ts";
import React, {useState} from "react";
import {useSearch} from "@/features/search/api/get-search.ts";
import {Pagination} from "@mantine/core";

type NovelCardListProps = {
    novels ?: NovelInfo[];
}

const NovelCardList: React.FC<NovelCardListProps> = (novelInfos) => {
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const pageSize = 60; // Define how many novels to show per page
    //Search and other pages displaying filtered novels
    if (novelInfos && novelInfos.novels) {
        return (
            <>
                <div className="flex flex-wrap w-full h-full">
                    {novelInfos.novels.map((novel, index) => (
                        <NovelCard key={index} title={novel["title_english"]}/>
                    ))}
                </div>
            </>
        )
    }
    else {
        // Novels page
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const novelsQuery = useSearch( {filter: { page: currentPage, pageSize: pageSize } } ); // Pass current page and page size

        if (novelsQuery.isLoading) { return (<div>Loading...</div>) }
        if (novelsQuery.isError) { return (<div>Error</div>) }

        const novels = novelsQuery?.data?.search_results;
        const totalPages = novelsQuery?.data?.totalPages || 1; // Assuming total_pages is returned in the response

        if (!novels) {
            return null;
        }

        return (
            <>
                <div className="flex flex-wrap w-full h-full">
                    {novels.map((novel, index) => (
                        <NovelCard key={index} title={novel["title_english"]} />
                    ))}
                </div>
                {/* Pagination Buttons */}
                <Pagination total={totalPages} value={currentPage} onChange={setCurrentPage} mt="sm" mb="sm"/>
            </>
        )
    }
}

export default NovelCardList;
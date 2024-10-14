import {searchOptions, useSearch} from "@/features/search/api/get-search.ts";
import {useLocation} from "react-router-dom";
import NovelCardList from "@/features/novels/components/novel-card-list.tsx";
import SearchControl from "@/features/search/components/search-control.tsx";
import {useEffect, useState} from "react";
import {Pagination} from "@mantine/core";

function parseSearchOptions(params: URLSearchParams): searchOptions {
    const tags = params.getAll('tags'); // Gets an array of all 'tags' values from the URL
    const rating = params.get('rating');
    const likes = params.get('likes');
    const page = params.get('page');
    const pageSize = params.get('pageSize');

    return {
        title: params.get('title') || undefined,
        source: params.get('source') || undefined,
        tags: tags.length > 0 ? tags : undefined, // Use the array directly if tags exist
        author: params.get('author') || undefined,
        description: params.get('description') || undefined,
        first_chapter_link: params.get('first_chapter_link') || undefined,
        rating: rating ? parseFloat(rating) : undefined,
        likes: likes ? parseInt(likes, 10) : undefined,
        source_english: params.get('source_english') || undefined,
        title_english: params.get('title_english') || undefined,
        description_english: params.get('description_english') || undefined,
        page: page ? parseInt(page, 10) : undefined,
        pageSize: pageSize ? parseInt(pageSize, 10) : undefined,
    };
}

const Search = () => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useState<searchOptions>({});
    const [currentPage, setCurrentPage] = useState<number>(1);
    // const pageSize = 100; // Define how many novels to show per page

    useEffect(() => {
        const parsedParams = parseSearchOptions(new URLSearchParams(location.search));
        setSearchParams(parsedParams);
        if (parsedParams.page) {
            setCurrentPage(parsedParams.page);
        } else {
            setCurrentPage(1); // Reset to page 1 if no page is provided in params
        }
    }, [location.search]);

    // Use the useSearch hook with the searchOptions object
    const searchQuery = useSearch({ filter: searchParams});

    if (searchQuery.isLoading) { return (<div>Loading...</div>) }
    if (searchQuery.isError) { return (<div> Error </div>) }

    const data = searchQuery?.data;
    const totalPages = searchQuery?.data?.totalPages || 1;

    if (!data) { return null; }

    const pageChangeHandler = (newPage: number) => {
        setSearchParams((prevParams) => ({...prevParams, page: newPage}))
        setCurrentPage(newPage);
    }

    return (
        <div className={"flex flex-col items-center"}>
            <SearchControl currentSearch={searchParams} setNewSearch={setSearchParams}/>
            <NovelCardList novels={data.search_results}/>
            <Pagination total={totalPages} value={currentPage} onChange={pageChangeHandler} mt="sm" mb="sm"/>
        </div>
    );
}

export default Search;
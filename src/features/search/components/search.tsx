import {searchOptions, useSearch} from "@/features/search/api/get-search.ts";
import {useLocation} from "react-router-dom";
import NovelCardList from "@/features/novels/components/novel-card-list.tsx";
import SearchControl from "@/features/search/components/search-control.tsx";
import {useEffect, useState} from "react";

function parseSearchOptions(params: URLSearchParams): searchOptions {
    const tags = params.getAll('tags'); // Gets an array of all 'tags' values from the URL
    const rating = params.get('rating');
    const likes = params.get('likes');

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
    };
}

const Search = () => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useState<searchOptions>({});

    useEffect(() => {
        setSearchParams(parseSearchOptions(new URLSearchParams(location.search)));
    }, [location.search])

    // Use the useSearch hook with the searchOptions object
    const searchQuery = useSearch({ filter: searchParams});

    if (searchQuery.isLoading) { return (<div>Loading...</div>) }
    if (searchQuery.isError) { return (<div> Error </div>) }

    const data = searchQuery?.data;

    if (!data) { return null; }

    return (
        <div className={"flex flex-col items-center"}>
            <SearchControl currentSearch={searchParams} setNewSearch={setSearchParams}/>
            <NovelCardList novels={data}/>
        </div>
    );
}

export default Search;
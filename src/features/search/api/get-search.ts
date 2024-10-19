import {NovelInfo} from "@/types/api.ts";
import {queryOptions, useQuery} from "@tanstack/react-query";
import {QueryConfig} from "@/lib/react-query.ts";
import {api} from "@/lib/api.ts";

export type searchOptions = {
    title?: string;
    source?: string;
    tags?: string[];
    tags_exclude?: string[];
    author?: string;
    description?: string;
    first_chapter_link?: string;
    rating?: number;
    likes?: number;
    source_english?: string;
    title_english?: string;
    description_english?: string;
    page ?: number;
    pageSize ?: number;
}

export type queryResponse = {
    search_results: NovelInfo[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
}

const getSearch = async (filter: searchOptions): Promise<queryResponse> => {
    const queryParams = new URLSearchParams();

    // Add each filter option if it exists
    Object.entries(filter).forEach(([key, value]) => {
        if (value) {
            if (Array.isArray(value)) {
                // Handle arrays, like tags
                value.forEach((item) => queryParams.append(key, item));
            } else {
                queryParams.append(key, value.toString());
            }
        }
    });

    if (localStorage.getItem('username') && localStorage.getItem('nsfw') === "true") {
        queryParams.append('nsfw', 'true');
    }

    // Make the API request with query parameters
    const response = await api.get(import.meta.env.VITE_API_URL + '/api/query?' + queryParams.toString());
    return response.data; // Assuming the response data contains the array of NovelInfo
};

export const getSearchQueryOptions = (filter: searchOptions) => {
    return queryOptions({
        queryKey: ['search', filter],
        queryFn: () => getSearch(filter),
    });
}

type UseSearchOptions = {
    filter?: searchOptions;
    queryConfig?: QueryConfig<typeof getSearchQueryOptions>;
};

export const useSearch = ({
                                   filter,
                                   queryConfig,
                               }: UseSearchOptions) => {
    return useQuery({
        ...getSearchQueryOptions(filter || {}),
        ...queryConfig,
    });
};
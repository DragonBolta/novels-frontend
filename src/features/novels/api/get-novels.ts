import {queryOptions, useQuery} from "@tanstack/react-query";
import {QueryConfig} from "@/lib/react-query.ts";
import {queryResponse} from "@/features/search/api/get-search.ts";
import {api} from "@/lib/api.ts";

// Fetch the chapter list
export const getNovels = async (): Promise<queryResponse> => {
    const response = await api.get(`${import.meta.env.VITE_API_URL}/api/query?`);
    return response.data; // Return the chapters
}

export const getNovelsQueryOptions = () => {
    return queryOptions({
        queryKey: ['novels'],
        queryFn: () => getNovels(),
    });
}

type UseNovelsOptions = {
    queryConfig?: QueryConfig<typeof getNovelsQueryOptions>;
};

export const useNovels = ({
                                   queryConfig,
                               }: UseNovelsOptions) => {
    return useQuery({
        ...getNovelsQueryOptions(),
        ...queryConfig,
    });
};
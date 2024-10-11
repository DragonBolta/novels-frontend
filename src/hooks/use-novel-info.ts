import axios from "axios";
import {queryOptions, useQuery} from "@tanstack/react-query";
import {QueryConfig} from "@/lib/react-query.ts";
import {NovelInfo} from "@/types/api.ts";

// Fetch the chapter list
export const getNovelInfo = async (novelName: string): Promise<NovelInfo> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/${novelName}`);
    return response.data[0]; // Return the chapters
}

export const getNovelInfoQueryOptions = (novelName: string) => {
    return queryOptions({
        queryKey: ['novelInfo', novelName],
        queryFn: () => getNovelInfo(novelName),
    });
}

type UseNovelInfoOptions = {
    novelName: string;
    queryConfig?: QueryConfig<typeof getNovelInfoQueryOptions>;
};

export const useNovelInfo = ({
                                 novelName,
                                 queryConfig,
                             }: UseNovelInfoOptions) => {
    return useQuery({
        ...getNovelInfoQueryOptions(novelName),
        ...queryConfig,
    });
};
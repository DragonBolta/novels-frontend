import axios from "axios";
import {queryOptions, useQuery} from "@tanstack/react-query";
import {QueryConfig} from "@/lib/react-query.ts";

// Fetch the chapter list
export const getChapterList = async (novelName: string): Promise<string[]> => {
    const response = await axios.get(`http://localhost:3000/api/${novelName}/chapterlist`);
    return response.data.chapters; // Return the chapters
}

export const getChapterListQueryOptions = (novelName: string) => {
    return queryOptions({
        queryKey: ['chapterList', novelName],
        queryFn: () => getChapterList(novelName),
    });
}

type UseChapterListOptions = {
    novelName: string;
    queryConfig?: QueryConfig<typeof getChapterListQueryOptions>;
};

export const useChapterList = ({
                                  novelName,
                                  queryConfig,
                              }: UseChapterListOptions) => {
    return useQuery({
        ...getChapterListQueryOptions(novelName),
        ...queryConfig,
    });
};
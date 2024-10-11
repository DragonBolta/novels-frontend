import axios from "axios";
import {queryOptions, useQuery} from "@tanstack/react-query";
import {QueryConfig} from "@/lib/react-query.ts";

function sanitizeFilename(filename: string) {
    // Windows invalid characters for filenames: <>:"/\|?*
    const invalidChars = /[<>:"/\\|?*]/g;
    // Replace invalid characters with an underscore or another placeholder
    return filename.replace(invalidChars, '');
}

// Fetch the chapter
export const getChapter = async (novelName: string, chapterNumber: number): Promise<string> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/${novelName ? sanitizeFilename(novelName) : ""}/${chapterNumber}`);
    return response.data.content; // Return the chapters
}

export const getChapterQueryOptions = (novelName: string, chapterNumber: number) => {
    return queryOptions({
        queryKey: ['chapter', novelName + chapterNumber],
        queryFn: () => getChapter(novelName, chapterNumber),
    });
}

type UseChapterOptions = {
    novelName: string;
    chapterNumber: number;
    queryConfig?: QueryConfig<typeof getChapterQueryOptions>;
};

export const useChapter = ({
                                  novelName,
                                  chapterNumber,
                                  queryConfig,
                              }: UseChapterOptions) => {
    return useQuery({
        ...getChapterQueryOptions(novelName, chapterNumber),
        ...queryConfig,
    });
};
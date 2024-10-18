import {useChapterList} from "@/features/table-of-contents/api/get-chapter-list.ts";
import {ScrollArea} from "@mantine/core";

const ChapterList = ({ novelName }: { novelName: string }) => {
    const chapterListQuery = useChapterList({novelName});

    if (chapterListQuery.isLoading) return <div>Loading...</div>;
    if (chapterListQuery.isError) {
        if (chapterListQuery.error.message === "Request failed with status code 404") {
            return <div>No chapters</div>
        }
        else {
            return <div>Error: {chapterListQuery.error.message}</div>;
        }
    }

    const chapterList = chapterListQuery?.data;

    if (!chapterList) return null;

    return (
        <ScrollArea h={250}>
            <div className="chapter-list flex flex-col">
                    {chapterList.map((chapter, index) => (
                        <a
                            key={index}
                            href={`${import.meta.env.VITE_SITE_URL}/novel/${encodeURIComponent(novelName)}/chapter/${index}`}
                        >
                            {chapter}
                        </a>
                    ))}
            </div>
        </ScrollArea>
    );
};

export default ChapterList;
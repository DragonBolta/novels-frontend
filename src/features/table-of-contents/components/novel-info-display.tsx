import {useNovelInfo} from "@/hooks/use-novel-info.ts";
import {NovelInfo} from "@/types/api.ts";
import {useParams} from "react-router-dom";
import {AspectRatio, Image, Pill} from "@mantine/core";
import sanitizeFilename from "@/lib/sanitize.ts";

const NovelInfoDisplay = () => {
    const { novelName = ""} = useParams<{ novelName: string }>();

    const novelInfoQuery = useNovelInfo({novelName});


    if (novelInfoQuery.isLoading) return <div>Loading...</div>;
    if (novelInfoQuery.isError) return <div>Error: {novelInfoQuery.error.message}</div>;

    const novelInfo: NovelInfo | undefined = novelInfoQuery?.data;

    const imgSrc = import.meta.env.VITE_API_URL + "/api/" + sanitizeFilename(novelName) + "/cover";

    if (!novelInfo) {
        return null;
    }
    return (
        <>
            <div className={"flex flex-col flex-wrap md:flex-row md:flex-nowrap items-start"}>
                <div className={"min-w-fit w-fit md:mr-4"}>
                    <AspectRatio ratio={2/3}>
                        <Image
                            src={imgSrc}
                            fallbackSrc={"/no_image.png"}
                            className="flex min-h-[70vh] md:min-h-[50vh] mb-4 md:mb-0 hover:opacity-60 rounded-lg"
                            alt={"Cover of " + novelName}
                        />
                    </AspectRatio>
                </div>
                <div className={"flex flex-col justify-start"}>
                    <b>{novelInfo["title_english"]}</b>
                    <p>{novelInfo["description_english"]}</p>
                    <div className={"flex flex-row justify-start space-x-2"}>
                        {novelInfo['tags'].map((tag, index) => (
                            <a href={import.meta.env.VITE_SITE_URL + "/search?tags=" + tag}>
                                <Pill className={"border-solid border-2 border-purple-500"} classNames={{label: "flex justify-center items-center"}} key={index}>
                                    {tag}
                                </Pill>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default NovelInfoDisplay;
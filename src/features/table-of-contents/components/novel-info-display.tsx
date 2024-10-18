import {NovelInfo} from "@/types/api.ts";
import {AspectRatio, Image, Paper, Pill, useMantineTheme} from "@mantine/core";
import sanitizeFilename from "@/lib/sanitize.ts";
import NovelStats from "@/features/table-of-contents/components/novel-stats.tsx";
import {useContext} from "react";
import {PageNovelInfo} from "@/contexts/page-novelinfo.tsx";

const NovelInfoDisplay = () => {
    const novelInfo: NovelInfo | undefined = useContext(PageNovelInfo)?.novelInfo;
    const theme = useMantineTheme();

    if (!novelInfo) {
        return <></>;
    }

    const imgSrc = import.meta.env.VITE_API_URL + "/api/" + sanitizeFilename(novelInfo.title_english) + "/cover";

    return (
        <>
            <Paper withBorder radius={"md"}>
                <div className={"flex flex-col flex-wrap md:flex-row md:flex-nowrap items-start"}>
                    <div className={"min-w-fit w-fit md:mr-4"}>
                        <AspectRatio ratio={2 / 3}>
                            <Image
                                src={imgSrc}
                                fallbackSrc={"/no_image.png"}
                                className="flex min-h-[70vh] max-h-[70vh] md:min-h-[50vh] md:max-h-[50vh] mb-4 md:mb-0 hover:opacity-60 rounded-lg"
                                alt={"Cover of " + novelInfo.title_english}
                            />
                        </AspectRatio>
                    </div>
                    <div className={"flex flex-col justify-start"}>
                        <b>{novelInfo["title_english"]}</b>
                        <NovelStats likes={novelInfo['likes']} rating={novelInfo['rating']}/>
                        <p>{novelInfo["description_english"]}</p>
                        <div className={"flex flex-row justify-start space-x-2"}>
                            {novelInfo['tags'].map((tag, index) => (
                                <a href={import.meta.env.VITE_SITE_URL + "/search?tags=" + tag}>
                                    <Pill className={`border-solid border-2 border-${theme.primaryColor}-500`}
                                          classNames={{label: "flex justify-center items-center"}} key={index}>
                                        {tag}
                                    </Pill>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </Paper>
        </>
    )
}

export default NovelInfoDisplay;
// Define a NovelCard component to represent individual novel items
import React from "react";
import {AspectRatio, Image, Tooltip} from '@mantine/core';
import sanitizeFilename from "@/lib/sanitize.ts";

const NovelCard: React.FC<{ title: string }> = ({title}) => {
    const imgSrc = import.meta.env.VITE_API_URL + "/api/" + sanitizeFilename(title) + "/cover";

    return (
        <div
            className="flex items-center justify-center w-1/2 xs:w-1/3 sm:w-1/5 p-1.5 hover:cursor-pointer group hover:text-themecolor">
            <a href={import.meta.env.VITE_SITE_URL + "/novel/" + sanitizeFilename(title)}
               className="flex flex-col items-center">
                <AspectRatio className="flex justify-center items-center" ratio={2/3}>
                    <Image
                        src={imgSrc}
                        fallbackSrc={"/no_image.png"}
                        className="flex min-w-[160px] md:min-w-[250px] m-1.5 overflow-hidden hover:opacity-60 rounded-lg"
                        alt={"Cover of " + title}
                    />
                </AspectRatio>
                <Tooltip label={title} openDelay={250} position="top">
                    <p className="text-center w-fit mt-1.5 mb-1.5 line-clamp-1">{title}</p>
                </Tooltip>
            </a>
        </div>
    );
};

export default NovelCard;
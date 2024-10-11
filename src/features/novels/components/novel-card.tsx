// Define a NovelCard component to represent individual novel items
import React from "react";
import {Image, Tooltip} from '@mantine/core';

function sanitizeFilename(filename: string): string {
    // Windows invalid characters for filenames: <>:"/\|?* and prevent control characters
    const invalidChars = /[<>:"/\\|?*]/g;
    let sanitized = filename.replace(invalidChars, '');

    // Strip leading/trailing spaces and periods
    sanitized = sanitized.trim().replace(/\.+$/, '');

    // Reserved filenames in Windows (e.g., "CON", "PRN", etc.)
    const reservedNames = new Set([
        "CON", "PRN", "AUX", "NUL",
        "COM1", "COM2", "COM3", "COM4", "COM5", "COM6", "COM7", "COM8", "COM9",
        "LPT1", "LPT2", "LPT3", "LPT4", "LPT5", "LPT6", "LPT7", "LPT8", "LPT9"
    ]);

    // Check if the sanitized filename is a reserved name, and append an underscore if so
    if (reservedNames.has(sanitized.toUpperCase())) {
        sanitized += '_';
    }

    return sanitized;
}

const NovelCard: React.FC<{ title: string }> = ({title}) => {
    const imgSrc = import.meta.env.VITE_API_URL + "/api/" + sanitizeFilename(title) + "/cover";

    return (
        <div
            className="flex items-center justify-center w-1/2 xs:w-1/3 sm:w-1/5 p-1.5 hover:cursor-pointer group hover:text-themecolor">
            <a href={import.meta.env.VITE_SITE_URL + "/novel/" + sanitizeFilename(title)}
               className="flex flex-col items-center">
                <Image
                    src={imgSrc}
                    fallbackSrc={"/no_image.png"} // If the image fails, trigger handleError
                    className="flex h-[250px] md:h-[400px] w-[100px] md:w-[250px] m-1.5 overflow-hidden relative hover:opacity-60 rounded-lg"
                    alt={"Cover of " + title}
                />
                <Tooltip label={title} openDelay={250} position="top">
                    <p className="w-fit mt-1.5 mb-1.5 line-clamp-1">{title}</p>
                </Tooltip>
            </a>
        </div>
    );
};

export default NovelCard;
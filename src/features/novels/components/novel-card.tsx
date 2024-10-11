// Define a NovelCard component to represent individual novel items
import React, {useState} from "react";

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

const NovelCard: React.FC<{ title: string }> = ({ title }) => {
    const [imgSrc, setImgSrc] = useState(import.meta.env.VITE_API_URL + "/api/" + sanitizeFilename(title) + "/cover");

    const handleError = () => {
        // Set the fallback image if the image URL is invalid or cannot be loaded
        setImgSrc("/no_image.png");
    };

    return (
        <div className="flex items-center justify-center w-1/2 xs:w-1/3 sm:w-1/5 p-1.5  hover:cursor-pointer group hover:text-themecolor">
            <a href={window.location.href + "novel/" + sanitizeFilename(title)}
               className="flex flex-col items-center">
                <img
                    src={imgSrc}
                    onError={handleError}  // If the image fails, trigger handleError
                    className="flex h-[250px] md:h-[400px] overflow-hidden relative hover:opacity-60 rounded-lg"
                    alt={"Cover of " + title}
                />
                <div className="w-fit">{title}</div>
            </a>
        </div>
    );
};

export default NovelCard;
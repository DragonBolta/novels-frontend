import React, {useEffect, useState} from 'react';
import axios from "axios";
import {NovelInfo} from "@/types/api.ts";

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

// Define a NovelCard component to represent individual novel items
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

const NovelsLayout: React.FC = () => {
    const [novels, setNovels] = useState<NovelInfo[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNovels = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + `/api/query`);
                setNovels(response.data);
            } catch (err: unknown) {
                if (typeof err === 'object' && err !== null && 'response' in err) {
                    const errorResponse = err as { response: { data: { error: string } } };
                    setError(errorResponse.response.data.error || 'Failed to fetch the chapter');
                } else {
                    setError('Failed to fetch the chapter');
                }
            } finally {
                setLoading(false);
            }
        }
        fetchNovels().then();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className="flex flex-col items-center">
                <h1>Novels</h1>
                <div className="flex flex-wrap w-full h-full">
                    {novels.map((novel, index) => (
                        <NovelCard key={index} title={novel["title_english"]} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default NovelsLayout;
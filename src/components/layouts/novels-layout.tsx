import React, {useEffect, useState} from 'react';
import axios from "axios";
import {NovelInfo} from "@/types/api.ts";

// Define a NovelCard component to represent individual novel items
const NovelCard: React.FC<{ title: string }> = ({ title }) => {
    return (
        <div className="flex items-center justify-center w-1/2 xs:w-1/3 sm:w-1/5 p-1.5  hover:cursor-pointer group hover:text-themecolor">
            <a href={window.location.href + "novel/" + title}
               className="flex flex-col items-center">
                <img src={import.meta.env.VITE_API_URL + "/api/" + title + "/cover"} className="flex h-[250px] md:h-[400px] overflow-hidden relative hover:opacity-60 rounded-lg" alt={"Cover of " + title}/>
                <div className="w-fit">{title}</div>
            </a>
        </div>
    );
};

const NovelsLayout: React.FC = () => {
    const [novels, setNovels] = useState<Array<NovelInfo>>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNovels = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + `/api/novels`);
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
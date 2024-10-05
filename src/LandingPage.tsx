import React, {useEffect, useState} from 'react';
import axios from "axios";

// Define a Novel component to represent individual novel items
const Novel: React.FC<{ title: string }> = ({ title }) => {
    return (
        <div className="w-1/2 xs:w-1/3 sm:w-1/5 p-1.5  hover:cursor-pointer group hover:text-themecolor">
            <a href={window.location.href + "novel/" + title}
               className="flex flex-col items-center">
                <img src={"http://localhost:3000/api/" + title + "/cover"} className="flex h-[250px] md:h-[400px] overflow-hidden relative hover:opacity-60" alt={"Cover of " + title}/>
                <div className="w-fit">{title}</div>
            </a>
        </div>
    );
};

const LandingPage: React.FC = () => {
    const [novels, setNovels] = useState<Array<string>>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNovels = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/novels`);
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
                <div className="flex flex-wrap space-x-4 w-full h-full">
                    {novels.map((novel, index) => (
                        <Novel key={index} title={novel} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default LandingPage;
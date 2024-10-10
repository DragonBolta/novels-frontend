import {useEffect} from "react";
import axios from "axios";

export type NovelInfoProps = {
    novelName: string | undefined;
    setNovelInfo: (info: object) => void;
    setError: (error: string) => void;
}

export const useNovelInfo = ({novelName, setNovelInfo, setError}: NovelInfoProps) => {
    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/${novelName}/`);
                setNovelInfo(response.data[0]);
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    // This check ensures that err is an Axios error
                    setError(err.response?.data?.error || 'Failed to fetch the novel info');
                } else {
                    setError('Failed to fetch the novel info');
                }
            }
        }
        if (novelName) {
            fetchInfo();
        }
    }, [novelName, setError, setNovelInfo])
}
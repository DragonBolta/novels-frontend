import NovelCard from "@/features/novels/components/novel-card.tsx";
import {useNovels} from "@/features/novels/api/get-novels.ts";

const NovelCardList = () => {
    const novelsQuery = useNovels({});

    if (novelsQuery.isLoading) { return (<div>Loading...</div>) }
    if (novelsQuery.isError) { return (<div> Error </div>) }

    const novels = novelsQuery?.data;

    if (!novels) {
        return null;
    }

    return (
        <>
            <div className="flex flex-wrap w-full h-full">
                {novels.map((novel, index) => (
                    <NovelCard key={index} title={novel["title_english"]}/>
                ))}
            </div>
        </>
    )
}

export default NovelCardList;
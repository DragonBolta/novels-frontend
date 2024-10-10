export type NovelInfo = {
    _id: {
        $oid: string;
    };
    title: string;
    source: string;
    tags: string[];
    author: string;
    description: string;
    first_chapter_link: string;
    rating: number;
    likes: number;
    source_english: string;
    title_english: string;
    description_english: string;
}
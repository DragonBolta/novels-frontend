export type NovelInfo = {
    _id: string;
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

export type RegisterResponse = {
    status: number,
    message: string,
}

export type LoginResponse = {
    status: number,
    message: string,
    access_token: string,
    refresh_token: string,
}

export type RefreshResponse = {
    status: number,
    message: string,
    access_token: string,
}
import {api} from "@/lib/api.ts";

type getCommentsOption = {
    novelId: string,
    chapterNumber: string,
}

export type commentInfo = {
    _id: string,
    commentId?: string,
    username: string,
    comment: string,
    timestamp: string,
}

type getCommentsResponse = {
    status: number,
    message: string,
    comments?: commentInfo[],
}

export const getComments = async ({novelId, chapterNumber}: getCommentsOption): Promise<getCommentsResponse> => {
    try {
        const response = await api.get(import.meta.env.VITE_API_URL + '/comments', {
            params: {
                novelId: novelId,
                chapterNumber: chapterNumber,
            }
        });
        // Return the successful response
        return { status: response.status, message: response.data.message, comments: response.data.comments.map((comment: commentInfo) => ({commentId: comment._id, ...comment})) };
    } catch (error: any) {
        // Handle the error response properly
        if (error.response) {
            return { status: error.response.status, message: error.response.data.error || 'An error occurred' };
        } else {
            // If the error response doesn't exist, return a generic error
            return { status: 500, message: 'Server error or no response received' };
        }
    }
}
import {api} from "@/lib/api.ts";

type createCommentOption = {
    username: string,
    comment: string,
    novelId: string,
    chapterNumber: string,
}

type createCommentResponse = {
    status: number,
    message: string
}

export const createComment = async ({username, comment, novelId, chapterNumber}: createCommentOption): Promise<createCommentResponse> => {
    try {
        const response = await api.post(import.meta.env.VITE_API_URL + '/comments/', {
            username: username,
            comment: comment,
            novelId: novelId,
            chapterNumber: chapterNumber,
        });
        // Return the successful response
        return { status: response.status, message: response.data.message };
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
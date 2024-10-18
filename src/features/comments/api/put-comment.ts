import {api} from "@/lib/api.ts";

type putCommentOption = {
    commentId: string,
    comment: string,
}

type putCommentResponse = {
    status: number,
    message: string
}

export const putComment = async ({commentId, comment}: putCommentOption): Promise<putCommentResponse> => {
    try {
        const response = await api.put(import.meta.env.VITE_API_URL + '/comments/' + commentId, {
            comment: comment,
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
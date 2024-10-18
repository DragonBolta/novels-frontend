import {api} from "@/lib/api.ts";

type deleteCommentOption = {
    commentId: string,
}

type deleteCommentResponse = {
    status: number,
    message: string
}

export const deleteComment = async ({commentId}: deleteCommentOption): Promise<deleteCommentResponse> => {
    try {
        const response = await api.delete(import.meta.env.VITE_API_URL + '/comments/' + commentId);
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
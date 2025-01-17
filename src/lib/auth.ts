import {LoginResponse, RegisterResponse} from "@/types/api.ts";
import {api} from "@/lib/api.ts";

export type RegisterInput = {
    username: string,
    email: string,
    password: string,
}

export type LoginInput = {
    email: string,
    password: string,
}

export const registerWithEmailAndPassword = async (data: RegisterInput): Promise<RegisterResponse> => {
    try {
        const response = await api.post(import.meta.env.VITE_API_URL + '/auth/register', {
            email: data.email,
            username: data.username,
            password: data.password,
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

export const loginWithEmailAndPassword = async (data: LoginInput): Promise<LoginResponse> => {
    const response= await api.post(import.meta.env.VITE_API_URL + '/auth/login', {
        email: data.email,
        password: data.password,
    });
    return {status: response.status, message: response.data.message, access_token: response.data.token, refresh_token: response.data.refreshToken, username: response.data.username}
}

export const logout = async () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    window.location.reload();
}
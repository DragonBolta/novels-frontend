import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Set global headers (optional)
api.defaults.headers.common['Content-Type'] = 'application/json';

// Add a request interceptor to inject access token into headers globally
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle 401 errors and refresh the token
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (token) {
            prom.resolve(token);
        } else {
            prom.reject(error);
        }
    });

    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        console.log("Unauthorized token");

        // Handle 401 Unauthorized errors for token expiration
        if (error.response.status === 401 && !originalRequest._retry) {
            console.log("Refreshing token");
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        return axios(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem('refresh_token'); // Use your refresh token mechanism

            return new Promise(function (resolve, reject) {
                api
                    .post('/auth/refreshToken', { refresh_token: refreshToken })
                    .then(({ data }) => {
                        localStorage.setItem('access_token', data.accessToken);

                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;
                        originalRequest.headers['Authorization'] = 'Bearer ' + data.accessToken;

                        processQueue(null, data.accessToken);
                        resolve(axios(originalRequest));
                    })
                    .catch((err) => {
                        if (err.response && err.response.status === 401) {
                            alert('Your session has expired. Please log in again.');
                            localStorage.removeItem('access_token');
                            localStorage.removeItem('refresh_token');
                            localStorage.removeItem('username');
                            window.location.href = '/auth';
                        }
                        processQueue(err, null);
                        reject(err);
                    })
                    .finally(() => {
                        isRefreshing = false;
                    });
            });
        }

        return Promise.reject(error);
    }
);
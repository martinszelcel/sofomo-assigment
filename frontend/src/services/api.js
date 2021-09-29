import axios from "axios";
import jwtDecode from "jwt-decode";

const api = axios.create({
    baseURL: '/api'
});

// Before sending any request
api.interceptors.request.use(async (config) => {
    // Get and decode access token
    const accessToken = sessionStorage.getItem('accessToken');
    let tokenExpirationTime = 0;

    if (accessToken) {
        const decoded = jwtDecode(accessToken);

        // Time in seconds left before token expires
        tokenExpirationTime = (new Date(decoded.exp * 1000) - new Date()) / 1000;
    }
    
    // If token is expired or expires in less than 10 seconds, refresh it
    if (tokenExpirationTime < 10 && config.url != '/auth/refreshToken') {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) return config;

        try {
            const response = await api.post('/auth/refreshToken', {
                refreshToken: refreshToken
            });
    
            accessToken = response.data.accessToken;
            refreshToken = response.data.refreshToken;
    
            sessionStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        } catch (error) {
            console.log("Error refreshing token", error);
        }
      
    }

    config.headers["Authorization"] = `Bearer ${accessToken}`;

    return config;
});

export default api;
import axios from "axios";
import jwtDecode from "jwt-decode";
import tokenService from "./tokenService";

const api = axios.create({
    baseURL: '/api'
});

// Before sending any request
api.interceptors.request.use(async (config) => {
    // Get and decode access token
    let accessToken = tokenService.getAccessToken();
    let tokenExpirationTime = 0;

    if (accessToken) {
        const decoded = jwtDecode(accessToken);

        // Time in seconds left before token expires
        tokenExpirationTime = (new Date(decoded.exp * 1000) - new Date()) / 1000;
    }
    
    // If token is expired or expires in less than 10 seconds, refresh it
    if (tokenExpirationTime < 10 && config.url != '/auth/refreshToken') {
        let refreshToken = tokenService.getRefreshToken();
        if (!refreshToken) return config;

        try {
            const response = await api.post('/auth/refreshToken', {refreshToken});
    
            accessToken = response.data.accessToken;
            refreshToken = response.data.refreshToken;
    
            tokenService.setTokens(accessToken, refreshToken);
        } catch (error) {
            console.log("Error refreshing token", error);
        }
      
    }

    config.headers["Authorization"] = `Bearer ${accessToken}`;

    return config;
});

export default api;
export default {
    getAccessToken() {
        return sessionStorage.getItem('accessToken');
    },

    getRefreshToken() {
        return localStorage.getItem('refreshToken');
    },

    setTokens(accessToken, refreshToken) {
        sessionStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    }
}
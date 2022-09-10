import axios from 'axios';

const tinyPokerApi = axios.create({
    baseURL: process.env.REACT_APP_API_TINY_POKER_URL || window.location.origin + "/api"
});

tinyPokerApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
    };

    return config;
})

export default tinyPokerApi;
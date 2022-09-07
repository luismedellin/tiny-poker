import axios from 'axios';

const tinyPokerApi = axios.create({
    baseURL: process.env.REACT_APP_API_TINY_POKER_URL
});

tinyPokerApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
    };

    return config;
})

export default tinyPokerApi;
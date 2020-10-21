import axios from 'axios';
import store from '../store';

const api = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL
});

api.interceptors.request.use(function (config) {
    // Do something before request is sent
    // let token = `Bearer ${store.getters['auth/api_token']}`;
    config.headers.Authorization = `Bearer ${store.getters['auth/api_token']}`
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default api;
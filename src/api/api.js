import axios from 'axios';

const API_BASE_URL = 'https://blog.kata.academy/api';

export const get = (endpoint) => {
    const url = `${API_BASE_URL}/${endpoint}`;
    return axios.get(url);
};

export const post = (endpoint, data) => {
    const url = `${API_BASE_URL}/${endpoint}`;
    return axios.post(url, data);
};

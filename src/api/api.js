import axios from './axios';

export const get = async (endpoint) => {
    const response = await axios.get(endpoint);
    return response.data;
};

export const post = async (endpoint, data) => {
    const response = await axios.post(endpoint, data);
    return response.data;
};

import {get, post} from "./api";
import axios from "./axios";

export const createUser = (username, email, password) => {
    const userData = {
        user: {
            username: username,
            email: email,
            password: password
        }
    };
    console.log(userData)
    return post('users', userData)
};

export const login = (email, password) => {
    const userData = {
        user: {
            email: email,
            password: password
        }
    };
    return post('users/login', userData);
};

export const getProfile = (username) => {
    const url = `profiles/${username}`;
    return get(url);
};

export const getUser = async () => {
    try {
        return await get('user/');
    } catch (error) {
        console.error('Error retrieving user:', error);
        throw error;
    }
};


export const updateUser = async (userData, token) => {
    const url = `/user`;
    const { data } = await axios.put(url, { user: userData });
    return data
};

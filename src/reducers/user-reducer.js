import { createSlice } from '@reduxjs/toolkit';

const initialToken = localStorage.getItem('token') || null;
const initialState = {
    token: initialToken,
    user: initialToken ? JSON.parse(localStorage.getItem('user')) : null,
};

export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            localStorage.setItem('token', action.payload.user.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            state.token = action.payload.user.token;
            state.user = action.payload.user;
        },
        clearUser: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            state.token = null;
            state.user = null;
        },
    },
});

export const { setUser, clearUser } = userReducer.actions;
export default userReducer.reducer;

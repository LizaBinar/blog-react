import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: '', // "search", "ok", "error"
};

export const statusReducer = createSlice({
    name: 'status',
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
    },
});

export const { setStatus, clearStatus } = statusReducer.actions;
export default statusReducer.reducer;

export const statusActions = {
    search: () => setStatus('search'),
    ok: () => setStatus('ok'),
    error: () => setStatus('error'),
    noStatus: () => setStatus(''),
};

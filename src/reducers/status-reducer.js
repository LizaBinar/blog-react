import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "", // "search", "ok", "error"
};

export const statusReducer = createSlice({
  name: "status",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = statusReducer.actions;
export default statusReducer.reducer;

function formatErrorMessages(errors) {
  return Object.entries(errors)
    .map(([field, message]) => `${field} ${message}`)
    .join(", ");
}

export const statusActions = {
  search: () => setStatus("search"),
  ok: () => setStatus("ok"),
  error: () => setStatus("error"),
  noStatus: () => setStatus(""),
  myStatus: (obj) => setStatus(formatErrorMessages(obj)),
};

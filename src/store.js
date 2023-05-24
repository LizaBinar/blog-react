import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user-reducer';
import statusReducer from "./reducers/status-reducer";

const rootReducer = combineReducers({
    user: userReducer,
    status: statusReducer
});

const store = configureStore({
    reducer: rootReducer
});

export default store;

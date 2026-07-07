import {configureStore} from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authReducer from './features/auth/authSlice';
import favoritesReducer from "./features/favorites/favoriteSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        favorites: favoritesReducer,
    },
    middleware:(getDefault) => getDefault().concat(apiSlice.middleware),
})


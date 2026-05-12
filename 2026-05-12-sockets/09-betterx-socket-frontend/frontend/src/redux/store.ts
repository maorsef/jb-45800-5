import followingSlice from './following-slice';
import profileSlice from './profile-slice'
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        followingSlice,
        profileSlice
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
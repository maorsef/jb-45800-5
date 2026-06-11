import followingSlice from './following-slice';
import followersSlice from './followers-slice';
import profileSlice from './profile-slice'
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        followingSlice,
        followersSlice,
        profileSlice
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
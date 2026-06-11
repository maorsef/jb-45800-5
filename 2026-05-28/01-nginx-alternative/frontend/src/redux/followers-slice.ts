import type User from "../models/User";
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

// describe the slice schema
interface FollowersState {
    followers: User[]
}

// initial state
const initialState: FollowersState = {
    followers: [],
}

const followersSlice = createSlice({
    name: 'followers',
    initialState,
    reducers: {
        populate: (state, action: PayloadAction<User[]>) => {
            state.followers = action.payload
        },
        newFollower: (state, action: PayloadAction<User>) => {
            state.followers.push(action.payload)        
        },
    }
})

export const { populate, newFollower } = followersSlice.actions

export default followersSlice.reducer


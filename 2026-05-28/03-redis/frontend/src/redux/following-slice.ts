import type User from "../models/User";
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

// describe the slice schema
interface FollowingState {
    following: User[]
}

// initial state
const initialState: FollowingState = {
    following: [],
}

const followingSlice = createSlice({
    name: 'following',
    initialState,
    reducers: {
        populate: (state, action: PayloadAction<User[]>) => {
            state.following = action.payload
        },
        follow: (state, action: PayloadAction<User>) => {
            state.following.push(action.payload)
        },
        unfollow: (state, action: PayloadAction<{id: string}>) => {
            state.following = state.following.filter(follow => follow.id !== action.payload.id)
        },    
    }
})

export const { populate, follow, unfollow } = followingSlice.actions

export default followingSlice.reducer


import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type Post from "../models/Post";
import type PostComment from "../models/PostComment";

interface ProfileState {
    posts: Post[]
}

const initialState: ProfileState = {
    posts: []
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        populate: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload
        },
        remove: (state, action: PayloadAction<{id: string}>) => {
            state.posts = state.posts.filter(post => post.id !== action.payload.id)
        },
        add: (state, action: PayloadAction<Post>) => {
            state.posts.push(action.payload)
        },
        addComment: (state, action: PayloadAction<PostComment>) => {
            state.posts.find(post => post.id === action.payload.postId)?.comments.push(action.payload)
        }
    }
})

export const { populate, remove, add, addComment } = profileSlice.actions

export default profileSlice.reducer
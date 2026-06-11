import type { NextFunction, Request, Response } from "express";
import Post from "../../models/Post";
import User from "../../models/User";
import Comment from "../../models/Comment";
import { newPostValidator } from "./validator";
import { commentIncludes, postIncludes, userPostsIncludes } from "../includes";
import socket from "../../io/io";
import { SocketMessages} from "socket-enums-shaharsol-xyz";
import { deletePostEmbedding, storePostEmbedding, updatePostEmbedding } from "../../db/pgvector";

export async function getProfile(request: Request, response: Response, next: NextFunction) {

    // this is the naive SQL way to start getting data...
    // equivalent to select * from posts where user_id = 'hjshjsdhjksdfhjkf'
    // const posts = await Post.findAll({ where: { userId } })

    // since we have sequelize, and User already has a posts: Post[]
    // declaration in the HasMany, we can simply fetch the user

    const { userId } = request
    try {
        const user = await User.findByPk(userId, {
            include: userPostsIncludes,
            order: [['createdAt', 'DESC']],
            // limit: 2,
            // offset: 4,
        })
        response.json(user.posts)

    } catch (e) {
        next(e)
    }
}

export async function getPost(request: Request<{postId: string}>, response: Response, next: NextFunction) {
    try {
        const { postId } = request.params

        const post = await Post.findByPk(postId, {
            include: postIncludes
        })

        if(!post) return next({
            status: 404,
            message: 'post does not exist'
        })

        response.json(post)

    } catch (e) {
        next(e)
    }
}

export async function deletePost(request: Request<{postId: string}>, response: Response, next: NextFunction) {
    try {
        const { postId } = request.params

        // a wasteful method to delete with 2 db accesses
        // use it only if you actually need data from the object before you delete it
        // const post = await Post.findByPk(postId)
        // await post.destroy()

        const numberOfRowsDeleted = await Post.destroy({where: {id: postId}})

        if(numberOfRowsDeleted === 0) return next({
            status: 404,
            message: 'you tried to delete an non-existing post'
        })

        await deletePostEmbedding(postId)

        response.json({ success: true })

    } catch (e) {
        next(e)
    }
}

export async function createPost(request: Request<{}, {}, {title: string, body: string}>, response: Response, next: NextFunction) {
    const { userId, imageUrl } = request
    
    console.log(request.files)

    try {

        const newPost = await Post.create({ 
            ...request.body,
            userId,
            imageUrl
        })
        await newPost.reload({
            include: postIncludes
        })
        await storePostEmbedding(newPost)
        response.json(newPost)

        const clientId = request.header('x-client-id')

        socket.emit(SocketMessages.NEW_POST, {
            clientId,
            post: newPost, 
        })

        console.log('emitted a NEW_POST socket message', {
            clientId,
            post: newPost, 
        })

    } catch (e) {
        console.log('there was an ERROR', e)
        next(e)
    }
}

export async function updatePost(request: Request<{postId: string}, {}, {title: string, body: string}>, response: Response, next: NextFunction) {
    try {

        const { postId } = request.params
        const { title, body } = request.body

        const updatedPost = await Post.findByPk(postId, {
            include: postIncludes
        })
        updatedPost.title = title
        updatedPost.body = body
        await updatedPost.save()
        await updatePostEmbedding(updatedPost)

        response.json(updatedPost)

    } catch (e) {
        console.log('there was an ERROR', e)
        next(e)
    }
}

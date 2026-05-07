import type { NextFunction, Request, Response } from "express";
import Post from "../../models/Post";
import User from "../../models/User";
import Comment from "../../models/Comment";

const userId = '1230ae30-dc4f-4752-bd84-092956f5c633'

export async function getProfile(request: Request, response: Response, next: NextFunction) {

    // this is the naive SQL way to start getting data...
    // equivalent to select * from posts where user_id = 'hjshjsdhjksdfhjkf'
    // const posts = await Post.findAll({ where: { userId } })

    // since we have sequelize, and User already has a posts: Post[]
    // declaration in the HasMany, we can simply fetch the user
    try {
        const user = await User.findByPk(userId, {
            include: [{
                model: Post,
                include: [
                    User,
                    { 
                        model: Comment,
                        include: [ User ]
                    }
                ]
            }]
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
            include: [
                User,
                { 
                    model: Comment,
                    include: [ User ]
                }
            ]
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

        response.json({ success: true })

    } catch (e) {
        next(e)
    }
}

export async function createPost(request: Request<{}, {}, {title: string, body: string}>, response: Response, next: NextFunction) {
    try {

        const newPost = await Post.create({ 
            ...request.body,
            userId,
            imageUrl: ''
        })
        await newPost.reload({
            include: [
                User,
                { 
                    model: Comment,
                    include: [ User ]
                }
            ]
        })
        response.json(newPost)

    } catch (e) {
        next(e)
    }
}

import type { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import Post from "../../models/Post";
import Comment from "../../models/Comment";

export async function getFeed(request: Request, response: Response, next: NextFunction) {
    try {
        const { userId } = request

        const { following } = await User.findByPk(userId, {
            include: [{ 
                model: User,
                as: 'following',
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
            }]
        })

        const followingPosts = following.reduce((cumulative: Post[], { posts }: User) => {
            return [...cumulative, ...posts]
        }, [])    

        response.json(followingPosts)
    } catch (e) {
        next(e)
    }
}

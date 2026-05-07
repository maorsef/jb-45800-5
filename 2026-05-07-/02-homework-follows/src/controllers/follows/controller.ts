import type { NextFunction, Request, Response } from "express";
import User from "../../models/User";

const userId = '1230ae30-dc4f-4752-bd84-092956f5c633'


export async function getFollowers(request: Request, response: Response, next: NextFunction) {
    try {
        const { followers } = await User.findByPk(userId, {
            include: [{ 
                model: User,
                as: 'followers'
            }]
        })
        response.json(followers)
    } catch (e) {
        next(e)
    }

}

export async function getFollowing(request: Request, response: Response, next: NextFunction) {
    try {
        const { following } = await User.findByPk(userId, {
            include: [{ 
                model: User,
                as: 'following'
            }]
        })
        response.json(following)
    } catch (e) {
        next(e)
    }

}
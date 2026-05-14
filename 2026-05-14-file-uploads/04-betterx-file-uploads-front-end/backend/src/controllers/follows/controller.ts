import type { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import Follow from "../../models/Follow";
import { followersIncludes, followingIncludes } from "../includes";
import socket from "../../io/io";
import { SocketMessages } from "socket-enums-shaharsol-xyz";


export async function getFollowers(request: Request, response: Response, next: NextFunction) {
    try {
        const { userId } = request

        const { followers } = await User.findByPk(userId, {
            include: followersIncludes
        })
        response.json(followers)
    } catch (e) {
        next(e)
    }

}

export async function getFollowing(request: Request, response: Response, next: NextFunction) {
    try {
        const { userId } = request

        const { following } = await User.findByPk(userId, {
            include: followingIncludes
        })
        response.json(following)
    } catch (e) {
        next(e)
    }

}

export async function follow(request: Request<{followeeId: string}>, response: Response, next: NextFunction) {
    try {
        const { userId } = request

        const { followeeId } = request.params
        
        const newFollow = await Follow.create({
            followerId: userId,
            followeeId 
        })

        response.json(newFollow)

        // this is the place to trigger a socket push notification
        // to the followerId and the followeeId
        const clientId = request.header('x-client-id')

        socket.emit(SocketMessages.NEW_FOLLOW, {
            clientId,
            follow: newFollow
        })

        console.log('emitted a NEW_FOLLOW socket message')


        
    } catch (e) {
        next(e)
    }
    
}


export async function unfollow(request: Request<{followeeId: string}>, response: Response, next: NextFunction) {
    try {

        const { userId } = request

        const { followeeId } = request.params
        
        const rowCount = await Follow.destroy({
            where: {
                followerId: userId,
                followeeId 
            }
        })

        if(rowCount === 0) return next({
            status: 404,
            message: 'yo bro you tried to delete a non existing followee'
        })

        response.json({success: true})
        
    } catch (e) {
        next(e)
    }
    
}
import type { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import Follow from "../../models/Follow";
import { followersIncludes, followingIncludes } from "../includes";
import socket from "../../io/io";
import { SocketMessages } from "socket-enums-shaharsol-xyz";
import { findSuggestedUserIds } from "../../db/pgvector";
import { Op } from "sequelize";
import Post from "../../models/Post";
import openai from "../../openai/openai";

const postsInclude = [{
    model: Post,
    attributes: ['title', 'body'],
}]


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

export async function suggest(request: Request, response: Response, next: NextFunction) {
    try {
        const { userId } = request

        const suggestedUserIds = await findSuggestedUserIds(userId)

        if (suggestedUserIds.length === 0) {
            return response.json([])
        }

        const authenticatedUser = await User.findByPk(userId, {
            include: postsInclude,
        })

        if (!authenticatedUser) {
            return next({
                status: 404,
                message: 'authenticated user does not exist'
            })
        }

        const candidateUsers = await User.findAll({
            where: {
                id: {
                    [Op.in]: suggestedUserIds
                }
            },
            include: postsInclude,
        })

        const usersById = new Map(candidateUsers.map(user => [user.id, user]))
        const orderedCandidates = suggestedUserIds
            .map(id => usersById.get(id))
            .filter((user): user is User => !!user)

        const systemPrompt = `
You are a social network recommendation assistant.
You will receive the authenticated user's profile and a list of candidate users found by content similarity.
Each user includes their posts (title and body).

Recommend which candidate users the authenticated user should follow based on shared interests, complementary content, and post similarity.
Write each reasonToFollow as a short, personalized explanation addressed to the authenticated user.

Return ONLY a JSON array with this exact shape:
[
  { "userId": "<candidate user id>", "reasonToFollow": "<explanation>" }
]

Only include candidates you actually recommend.
Order by strongest recommendation first.
`.trim()

        const userContent = JSON.stringify({
            authenticatedUser: {
                userId: authenticatedUser.id,
                name: authenticatedUser.name,
                username: authenticatedUser.username,
                posts: authenticatedUser.posts ?? [],
            },
            candidates: orderedCandidates.map(user => ({
                userId: user.id,
                name: user.name,
                username: user.username,
                posts: user.posts ?? [],
            })),
        }, null, 2)

        const llmResponse = await openai.responses.create({
            model: "gpt-4.1-mini",
            input: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userContent },
            ],
        })

        const rawResult = llmResponse.output_text?.trim()

        if (!rawResult) {
            return next({
                status: 500,
                message: 'could not extract follow suggestions from llm response'
            })
        }

        const jsonText = rawResult.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '')

        let recommendations: { userId: string, reasonToFollow: string }[]
        try {
            recommendations = JSON.parse(jsonText)
        } catch {
            return next({
                status: 500,
                message: 'could not parse follow suggestions from llm response'
            })
        }

        if (!Array.isArray(recommendations)) {
            return next({
                status: 500,
                message: 'llm follow suggestions response is not an array'
            })
        }

        const allowedUserIds = new Set(suggestedUserIds)
        const validatedRecommendations = recommendations.filter(recommendation => {
            return typeof recommendation?.userId === 'string'
                && typeof recommendation?.reasonToFollow === 'string'
                && allowedUserIds.has(recommendation.userId)
        })

        response.json(validatedRecommendations)
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

        const follower = await User.findByPk(userId)

        socket.emit(SocketMessages.NEW_FOLLOW, {
            clientId,
            follow: {...newFollow, follower}
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
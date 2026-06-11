import type { NextFunction, Request, Response } from "express";
import Comment from "../../models/Comment";
import User from "../../models/User";
import { commentIncludes } from "../includes";
export async function newComment(request: Request<{postId: string}, {}, {body: string}>, response: Response, next: NextFunction) {
    try {

        const { userId } = request
        const { postId } = request.params
        const { body } = request.body

        const comment = await Comment.create({
            userId,
            postId,
            body
        })
        await comment.reload({
            include: commentIncludes
        })
        response.json(comment)
    } catch (e) {
        next(e)
    }
}
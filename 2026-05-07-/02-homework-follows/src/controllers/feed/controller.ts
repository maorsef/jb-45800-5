import type { NextFunction, Request, Response } from "express";

export function getFeed(request: Request, response: Response, next: NextFunction) {
    response.json({
        id: 2,
        title: 'the beautiful feed'
    })
}

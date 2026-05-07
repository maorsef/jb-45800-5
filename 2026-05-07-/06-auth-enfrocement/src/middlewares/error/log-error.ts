
import type { NextFunction, Request, Response } from "express";

export default function logError(err: any, request: Request, response: Response, next: NextFunction) {
    console.error(err);
    next(err)
}
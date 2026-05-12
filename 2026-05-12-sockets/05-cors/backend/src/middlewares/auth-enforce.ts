import type { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from 'config'
import User from "../models/User";

// this is a directive for the TS complier
// to let it know that whenever it compiles an interface
// named Request that is under Express
// it should allow the usage of a property named userId of type string
// this is like extending the Express Request object
declare global {
    namespace Express {
        interface Request {
            userId: string
        }
    }
}


export default function authEnforce(request: Request, response: Response, next: NextFunction) {
    // this middleware objective are:
    // extract the jwt from the headers
    // realize from the jwt who is the user
    // get their userId, and load it on the request
    // so any middleware that runs after me, 
    // can access the userId using request.userId
    const authHeader = request.get('Authorization')

    if(!authHeader) return next({
        status: 401,
        message: 'auth header is missing!'
    })

    if(!authHeader.startsWith('Bearer')) return next({
        status: 401,
        message: 'you probably use the wrong auth mechanism'
    })

    const [bearerWord, jwt] = authHeader.split(' ')

    if(!jwt) return next({
        status: 401,
        message: 'i see auth header but can not extract a jwt token'
    })

    const key = config.get<string>('app.encryptionKey')
    const { id } = verify(jwt, key) as User

    request.userId = id

    next()
}
import type { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import config from 'config'
import { createHmac } from "crypto";
import { sign } from "jsonwebtoken";

function hashPassword(plainTextPassword: string): string {
    const key = config.get<string>('app.encryptionKey')
    return createHmac('sha256', key).update(plainTextPassword).digest('hex')
}


export async function signup(request: Request<{}, {}, {name: String, username: string, password: string}>, response: Response, next: NextFunction) {
    try {
        // hash and salt the password
        request.body.password = hashPassword(request.body.password)

        // save the user in database with hashed and salted password
        const newUser = await User.create(request.body)

        // generate jwt from the user record
        const jwt = sign(newUser.get({ plain: true }), config.get<string>('app.encryptionKey'))
        response.json({ jwt })
    } catch(e) {
        next(e)
    }

}


export async function login(request: Request<{}, {}, {username: string, password: string}>, response: Response, next: NextFunction) {
    try {

        const { username, password } = request.body

        const user = await User.findOne({where: {
            username,
            password: hashPassword(password)
        }})

        if(!user) return next({
            status: 401,
            message: 'wrong credentials'
        })

        // generate jwt from the user record
        const jwt = sign(user.get({ plain: true }), config.get<string>('app.encryptionKey'))
        response.json({ jwt })

    } catch (e) {
        next(e)
    }
}
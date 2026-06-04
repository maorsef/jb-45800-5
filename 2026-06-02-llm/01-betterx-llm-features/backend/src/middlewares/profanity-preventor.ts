import type { NextFunction, Request, Response } from "express";
import openai from "../openai/openai";
import type { EasyInputMessage } from "openai/resources/responses/responses";

export default async function profanityPreventor(request: Request, response: Response, next: NextFunction) {
    try {
        const { title, body } = request.body as { title: string, body: string }

        const systemPrompt = `
You are a content moderation assistant.
You will receive a post title and body.
Determine whether the content contains profanity or language that is not safe to publish.

Return ONLY the word "true" if the content contains profanity.
Return ONLY the word "false" if the content is safe to publish.
`.trim()

        const userContent = `Title:
${title}

Body:
${body}`

        const input: EasyInputMessage[] = [
            { role: "system", content: systemPrompt },
            { role: "user", content: userContent }
        ]

        const llmResponse = await openai.responses.create({
            model: "gpt-4.1-mini",
            input
        })

        const result = llmResponse.output_text?.trim().toLowerCase()

        if (result === 'true') {
            return next({
                status: 422,
                message: 'post contains profanity and cannot be published'
            })
        }

        if (result === 'false') {
            return next()
        }

        return next({
            status: 500,
            message: 'could not evaluate content for profanity'
        })
    } catch (e) {
        next(e)
    }
}

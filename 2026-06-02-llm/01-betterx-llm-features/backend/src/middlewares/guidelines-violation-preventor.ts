import type { NextFunction, Request, Response } from "express";
import openai from "../openai/openai";
import type { EasyInputMessage } from "openai/resources/responses/responses";
import { allContentGuidelinesText } from "../content-guidelines";
import { findClosestContentGuideline } from "../db/pgvector";

export default async function guidelinesViolationPreventor(request: Request, response: Response, next: NextFunction) {
    try {
        const { title, body } = request.body as { title: string, body: string }

        const postText = `${title}\n\n${body}`

        const embeddingsResponse = await openai.embeddings.create({
            model: 'text-embedding-3-small',
            input: postText,
        })

        const embedding = embeddingsResponse.data[0]?.embedding

        if (!embedding) {
            return next({
                status: 500,
                message: 'could not create embedding for post content'
            })
        }

        const closestContentGuideline = await findClosestContentGuideline(embedding)

        console.log('closest content guideline:', closestContentGuideline?.title)

        const systemPrompt = `
${allContentGuidelinesText}

---
You are a content moderation assistant.
You will receive a post title and body.
Evaluate the content against all policies above (profanity, medical, and cryptocurrency/financial).

Return ONLY the word "true" if the content violates any policy and is not safe to publish.
Return ONLY the word "false" if the content is safe to publish per all policies.
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

        if (llmResponse.usage) {
            console.log('guidelines violation check token usage', {
                input_tokens: llmResponse.usage.input_tokens,
                output_tokens: llmResponse.usage.output_tokens,
                total_tokens: llmResponse.usage.total_tokens,
                input_tokens_details: llmResponse.usage.input_tokens_details,
                output_tokens_details: llmResponse.usage.output_tokens_details,
            })
        }

        const result = llmResponse.output_text?.trim().toLowerCase()

        if (result === 'true') {
            return next({
                status: 422,
                message: 'post violates content guidelines and cannot be published'
            })
        }

        if (result === 'false') {
            return next()
        }

        return next({
            status: 500,
            message: 'could not evaluate content against guidelines'
        })
    } catch (e) {
        next(e)
    }
}

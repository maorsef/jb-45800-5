import './pgvector-sequelize'
import { QueryTypes } from "sequelize";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { toSql: vectorToSql } = require('pgvector') as { toSql: (value: number[]) => string }
import { Sequelize } from "sequelize-typescript";
import config from 'config'
import ContentGuideline from "../models/ContentGuideline";
import PostEmbedding from "../models/PostEmbedding";
import Post from "../models/Post";
import openai from "../openai/openai";
import { contentGuidelineDocuments } from "../content-guidelines";

const pgvectorDb = new Sequelize({
    dialect: 'postgres',
    models: [ContentGuideline, PostEmbedding],
    logging: console.log,
    ...config.get('pgvector')
})

console.log(`connected to pgvector database on `, config.get('pgvector'))

async function createEmbeddingVectorForPost(title: string, body: string): Promise<number[]> {
    const postText = `${title}\n\n${body}`

    const embeddingsResponse = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: postText,
    })

    const vector = embeddingsResponse.data[0]?.embedding

    if (!vector) {
        throw new Error('could not create embedding for post content')
    }

    return vector
}

export async function storePostEmbedding(post: Pick<Post, 'id' | 'userId' | 'title' | 'body'>) {
    const vector = await createEmbeddingVectorForPost(post.title, post.body)

    await PostEmbedding.create({
        postId: post.id,
        userId: post.userId,
        vector,
    })

    console.log(`stored embedding for post: ${post.id}`)
}

export async function updatePostEmbedding(post: Pick<Post, 'id' | 'userId' | 'title' | 'body'>) {
    const vector = await createEmbeddingVectorForPost(post.title, post.body)

    await PostEmbedding.upsert({
        postId: post.id,
        userId: post.userId,
        vector,
    })

    console.log(`updated embedding for post: ${post.id}`)
}

export async function deletePostEmbedding(postId: string) {
    await PostEmbedding.destroy({ where: { postId } })

    console.log(`deleted embedding for post: ${postId}`)
}

export async function initGuidelinesEmbeddings() {
    for (const document of contentGuidelineDocuments) {
        const embeddingsResponse = await openai.embeddings.create({
            model: 'text-embedding-3-small',
            input: document.text,
        })

        const vector = embeddingsResponse.data[0]?.embedding

        if (!vector) {
            throw new Error(`could not create embedding for guideline ${document.subject}`)
        }

        await ContentGuideline.upsert({
            title: document.subject,
            text: document.text,
            vector,
        })

        console.log(`stored embedding for content guideline: ${document.subject}`)
    }
}

export async function initPostEmbeddings() {
    const posts = await Post.findAll({
        attributes: ['id', 'userId', 'title', 'body'],
    })

    const existingEmbeddings = await PostEmbedding.findAll({
        attributes: ['postId'],
    })
    const existingPostIds = new Set(existingEmbeddings.map(({ postId }) => postId))

    for (const post of posts) {
        if (existingPostIds.has(post.id)) {
            continue
        }

        await storePostEmbedding(post)
    }
}

export async function findSuggestedUserIds(userId: string): Promise<string[]> {
    const rows = await pgvectorDb.query<{ userId: string }>(
        `WITH my_avg AS (
            SELECT avg(vector) AS vector
            FROM post_embeddings
            WHERE user_id = $1
        ),
        other_user_avgs AS (
            SELECT user_id, avg(vector) AS vector
            FROM post_embeddings
            WHERE user_id != $1
            GROUP BY user_id
        )
        SELECT other_user_avgs.user_id AS "userId"
        FROM other_user_avgs, my_avg
        WHERE my_avg.vector IS NOT NULL
        ORDER BY other_user_avgs.vector <=> my_avg.vector
        LIMIT 2`,
        {
            bind: [userId],
            type: QueryTypes.SELECT,
        }
    )

    return rows.map(({ userId }) => userId)
}

export async function findClosestContentGuideline(embedding: number[]): Promise<Pick<ContentGuideline, 'title' | 'text'> | null> {
    const rows = await pgvectorDb.query<Pick<ContentGuideline, 'title' | 'text'>>(
        `SELECT title, text
         FROM content_guidelines
         ORDER BY vector <=> $1
         LIMIT 1`,
        {
            bind: [vectorToSql(embedding)],
            type: QueryTypes.SELECT,
        }
    )

    return rows[0] ?? null
}

export default pgvectorDb

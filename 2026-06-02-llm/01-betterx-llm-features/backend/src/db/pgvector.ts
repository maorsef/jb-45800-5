import './pgvector-sequelize'
import pgvector from 'pgvector'
import { QueryTypes, Sequelize } from "sequelize";
import { Sequelize as SequelizeTypescript } from "sequelize-typescript";
import config from 'config'
import ContentGuideline from "../models/ContentGuideline";
import openai from "../openai/openai";
import { contentGuidelineDocuments } from "../content-guidelines";

const pgvector = new SequelizeTypescript({
    dialect: 'postgres',
    models: [ContentGuideline],
    logging: console.log,
    ...config.get('pgvector')
})

console.log(`connected to pgvector database on `, config.get('pgvector'))

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

export async function findClosestContentGuideline(embedding: number[]): Promise<Pick<ContentGuideline, 'title' | 'text'> | null> {
    const rows = await pgvector.query<Pick<ContentGuideline, 'title' | 'text'>>(
        `SELECT title, text
         FROM content_guidelines
         ORDER BY vector <=> $1
         LIMIT 1`,
        {
            bind: [pgvector.toSql(embedding)],
            type: QueryTypes.SELECT,
        }
    )

    return rows[0] ?? null
}

export default pgvector

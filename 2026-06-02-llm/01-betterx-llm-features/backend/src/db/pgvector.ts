import './pgvector-sequelize'
import { Sequelize } from "sequelize-typescript";
import config from 'config'
import ContentGuideline from "../models/ContentGuideline";
import openai from "../openai/openai";
import { contentGuidelineDocuments } from "../content-guidelines";

const pgvector = new Sequelize({
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

export default pgvector

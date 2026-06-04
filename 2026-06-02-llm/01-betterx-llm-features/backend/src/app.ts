import express, { json } from 'express'
import logError from './middlewares/error/log-error'
import config from 'config'
import respondError from './middlewares/error/error-responder'
import notFound from './middlewares/not-found'
import profileRouter from './routers/profile'
import feedRouter from './routers/feed'
import sequelize from './db/sequelize'
import pgvector, { initGuidelinesEmbeddings } from './db/pgvector'
import followsRouter from './routers/follows'
import authRouter from './routers/auth'
import authEnforce from './middlewares/auth-enforce'
import commentsRouter from './routers/comments'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import { createAppBucketIfNotExist } from './aws/aws'
import draftsRouter from './routers/drafts'


(async () => {
    const port = config.get<number>('app.port')
    const name = config.get<string>('app.name')


    const app = express()

    // middlewares
    app.use('/', cors())
    app.use('/auth', authRouter)
    app.use('/', authEnforce)
    app.use('/feed', feedRouter)
    app.use('/follows', followsRouter)
    app.use('/', json())
    app.use('/', fileUpload()) // middelware to handle posts with content type n
    app.use('/profile', profileRouter)
    app.use('/comments', commentsRouter)
    app.use('/drafts', draftsRouter)
    app.use('/', notFound)

    // error middlewares
    app.use('/', logError)
    app.use('/', respondError)

    // start our sequelize engine,
    // is is called sync because the 1st thing it will do
    // is to connect to the database and then
    // check the models array against the database
    // and create all missing tables
    // using {force: true} is SUPER SUPER SUPER dangerous!!!
    // especially in production
    const syncForce = !!config.get('app.sync.force')

    await sequelize.sync({ force: syncForce })
    await pgvector.sync({ force: syncForce })
    await initGuidelinesEmbeddings()

    // make sure i have s3 bucket
    // that is, create the s3 bucket if it does not exist already
    await createAppBucketIfNotExist()

    // starting the server
    app.listen(port, () => console.log(`app ${name} started on port ${port}....`))
})()

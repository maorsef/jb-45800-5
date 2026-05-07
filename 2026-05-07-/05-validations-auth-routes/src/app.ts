import express from 'express'
import logError from './middlewares/error/log-error'
import config from 'config'
import respondError from './middlewares/error/error-responder'
import notFound from './middlewares/not-found'
import profileRouter from './routers/profile'
import feedRouter from './routers/feed'
import sequelize from './db/sequelize'
import followsRouter from './routers/follows'
import authRouter from './routers/auth'

const port = config.get<number>('app.port')
const name = config.get<string>('app.name')


const app = express()

// middlewares
app.use('/profile', profileRouter)
app.use('/feed', feedRouter)
app.use('/follows', followsRouter)
app.use('/auth', authRouter)
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
sequelize.sync({force: !!config.get('app.sync.force')})

// starting the server
app.listen(port, () => console.log(`app ${name} started on port ${port}....`))
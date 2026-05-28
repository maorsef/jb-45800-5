import express, { json } from 'express'
import logError from './middlewares/error/log-error'
import config from 'config'
import respondError from './middlewares/error/error-responder'
import notFound from './middlewares/not-found'
import cors from 'cors'
import sequelize from './db/sequelize'
import categoriesRouter from './routers/categories'
import productsRouter from './routers/products'


(async () => {
    const port = config.get<number>('app.port')
    const name = config.get<string>('app.name')


    const app = express()

    // middlewares
    app.use('/', cors())
    app.use('/', json())

    // load routers here...
    app.use('/categories', categoriesRouter)
    app.use('/products', productsRouter)

    // not found
    app.use('/', notFound)

    // error middlewares
    app.use('/', logError)
    app.use('/', respondError)

    await sequelize.sync({force: !!config.get('app.sync.force')})

    // starting the server
    app.listen(port, () => console.log(`app ${name} started on port ${port}....`))
})()

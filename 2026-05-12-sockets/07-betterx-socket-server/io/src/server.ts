import { Server } from 'socket.io'
import config from 'config'

const port = config.get<number>('app.port')

const server = new Server({
    cors: {
        origin: '*'
    }
})

server.listen(port)

console.log(`io server started on ${port}`)
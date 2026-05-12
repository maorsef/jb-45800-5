import { Server } from 'socket.io'
import config from 'config'

const port = config.get<number>('app.port')

const server = new Server({
    cors: {
        origin: '*'
    }
})

server.on('connection', socket => {
    console.log('got a new connection')
    socket.onAny((eventName: string, payload: object) => {
        console.log(`got a ${eventName} message with payload: `, payload)
        server.emit(eventName, payload)
    })
})

server.listen(port)

console.log(`io server started on ${port}`)
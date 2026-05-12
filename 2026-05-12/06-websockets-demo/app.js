const { Server } = require('socket.io')
const { randomUUID } = require('crypto')
const server = new Server({
    cors: {
        origin: '*'
    }
})

server.on('connection', socket => {
    console.log('new socket connection...')

    const id = randomUUID()

    socket.emit('welcome', { id })

    server.emit('new user', { id })

    socket.on('disconnect', () => {
        console.log('socket disconnected...')
    })
})

server.listen(3004)
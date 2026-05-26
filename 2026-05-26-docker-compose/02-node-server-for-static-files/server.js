const express = require('express')
const fs = require('fs/promises')

const server = express()

server.get('/health', (req, res) => res.send('healthy'))

// this is how we would manually server static files from an express server
// to demonstrate the amount of io required
// server.get('/website', async (req, res) => {
//     const html = await fs.readFile('./index.html', {encoding:'utf8'})
//     res.send(html)
// })

server.use('/website', express.static('public'))




server.listen(3009)
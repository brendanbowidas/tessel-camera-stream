const express = require('express')
const os = require('os')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path')
const cp = require('child_process')
const port = 8080
const av = require('tessel-av')

server.listen(port, () => {
  console.log(`http://${os.hostname()}.local:${port}`)
})

app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

io.on('connection', socket => {
  const camera = new av.Camera()
  socket.on('ready', () => camera.stream())
  camera.on('data', data => {
    socket.emit('image', data.toString('base64'))
  })
})

process.on('SIGINT', _ => server.close())

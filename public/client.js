window.onload = function() {
  var context = document.querySelector('#output').getContext('2d')
  var socket = io()
  var frame = null

  socket.on('image', data => {
    frame = "data:image/jpeg;base64," + data
  })

  socket.emit('ready')

  setInterval(function() {
    if (frame) {
      var image = new Image()
      image.src = frame
      try {
        context.drawImage(image, 0, 0)
      } catch (e) {
        console.log(e)
      }
    }
  }, 1000 / 24)
}

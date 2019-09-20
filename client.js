'use strict'

// load websocket library if we are not in the browser
var WebSocket = require('./web-socket')
var duplex = require('./duplex')
var wsurl = require('./ws-url')

module.exports = function (addr, opts) {
  const location = typeof window === 'undefined' ? {} : window.location

  const url = wsurl(addr, location)
  const socket = new WebSocket(url)

  const stream = duplex(socket, opts)
  stream.remoteAddress = url
  stream.socket = socket
  stream.close = () => new Promise((resolve, reject) => {
    socket.addEventListener('close', resolve)
    socket.close()
  })

  return stream
}

module.exports.connect = module.exports

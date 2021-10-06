'use strict'

// load websocket library if we are not in the browser
var WebSocket = require('./web-socket')
var duplex = require('./duplex')
var wsurl = require('./ws-url')

module.exports = async function (addr, opts = {}) {
  let socket
  let url
  if (opts.cloudflareWorker) {
    // since the WebSocket object is not available in cloudflare workers we
    // have to ask the worker environment to upgrade the http request
    url = new URL(addr.replace('wss', 'https'))

    const resp = await fetch(url, {
      headers: {
        Upgrade: 'websocket'
      }
    })

    socket = resp.webSocket
    if (!socket) {
      throw new Error('failed to upgrade to websocket')
    }
    // Call accept() to indicate that we'll be handling the socket here
    // in JavaScript, as opposed to returning it on to a client.
    socket.accept()
  } else {
    const location = typeof window === 'undefined' ? {} : window.location

    url = wsurl(addr, location)
    socket = new WebSocket(url, opts.websocket)
  }
  const stream = duplex(socket, opts)
  stream.remoteAddress = url
  stream.close = () => new Promise((resolve, reject) => {
    socket.addEventListener('close', resolve)
    socket.close()
  })
  stream.destroy = () => {
    if (socket.terminate) {
      socket.terminate()
    } else {
      socket.close()
    }
  }
  stream.socket = socket

  return stream
}

module.exports.connect = module.exports

'use strict'

// load websocket library if we are not in the browser
var WebSocket = require('./web-socket')
var duplex = require('./duplex')
var wsurl = require('./ws-url')

module.exports = function (addr, opts = {}) {
  const location = typeof window === 'undefined' ? {} : window.location

  const url = wsurl(addr, location)
  const socket = new WebSocket(url, opts.websocket)

  return duplex(socket, opts)
}

module.exports.connect = module.exports

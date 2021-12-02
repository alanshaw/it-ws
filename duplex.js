const source = require('./source')
const sink = require('./sink')

module.exports = (socket, options, req) => {
  options = options || {}

  if (options.binaryType) {
    socket.binaryType = options.binaryType
  } else if (options.binary) {
    socket.binaryType = 'arraybuffer'
  }

  const duplex = {
    sink: sink(socket, options),
    source: source(socket, options),

    connected: () => duplex.source.connected(),
    close: () => new Promise((resolve) => {
      socket.addEventListener('close', resolve)
      socket.close()
    }),
    destroy: () => {
      if (socket.terminate) {
        socket.terminate()
      } else {
        socket.close()
      }
    },

    socket: socket
  }

  if (req) {
    duplex.remoteAddress = req.socket.remoteAddress
    duplex.remotePort = req.socket.remotePort
  } else {
    duplex.remoteAddress = socket.url
  }

  return duplex
}

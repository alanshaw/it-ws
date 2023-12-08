// load websocket library if we are not in the browser
import duplex from './duplex.js'
import WebSocket from './web-socket.js'
import wsurl from './ws-url.js'
import type { DuplexWebSocket } from './duplex.js'
import type { SinkOptions } from './sink.js'
import type { ClientOptions } from 'ws'

export interface WebSocketOptions extends SinkOptions {
  websocket?: ClientOptions
}

export function connect (addr: string, opts?: WebSocketOptions): DuplexWebSocket {
  const location = typeof window === 'undefined' ? undefined : window.location
  opts = opts ?? {}

  const url = wsurl(addr, location)

  // it's necessary to stringify the URL object otherwise react-native crashes
  const socket = new WebSocket(url.toString(), opts.websocket)
  return duplex(socket, opts)
}

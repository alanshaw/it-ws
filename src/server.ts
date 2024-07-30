import { EventEmitter } from 'events'
import http from 'http'
import https from 'https'
import { WebSocketServer as WSServer } from 'ws'
import duplex, { type DuplexWebSocket } from './duplex.js'
import type WebSocket from './web-socket.js'
import type { VerifyClientCallbackSync, VerifyClientCallbackAsync, AddressInfo } from 'ws'

export interface ClientWebSocket extends WebSocket {
  alive?: boolean
}

export interface ServerOptions {
  key?: string
  cert?: string
  server?: http.Server | https.Server
  verifyClient?: VerifyClientCallbackAsync | VerifyClientCallbackSync
  onConnection?(connection: DuplexWebSocket): void

  /**
   * If specified, send a PING to every connected client, if
   * they do not respond with a PONG before the next interval,
   * terminate the connection
   */
  heartbeatMs?: number
}

export interface WebSocketServer extends EventEmitter {
  listen(addrInfo: { port: number } | number): Promise<WebSocketServer>
  close(): Promise<void>
  address(): string | AddressInfo | null
}

class Server extends EventEmitter {
  private readonly server: http.Server | https.Server
  private readonly wsServer: WSServer
  private readonly heartbeatMs?: number
  private heartbeatInterval?: ReturnType<typeof setInterval>

  constructor (server: http.Server | https.Server, opts?: ServerOptions) {
    super()
    opts = opts ?? {}
    this.server = server
    this.wsServer = new WSServer({
      server,
      perMessageDeflate: false,
      verifyClient: opts.verifyClient
    })
    this.wsServer.on('connection', this.onWsServerConnection.bind(this))
    this.heartbeatMs = opts?.heartbeatMs
  }

  async listen (addrInfo: { port: number } | number): Promise<WebSocketServer> {
    if (this.heartbeatMs != null) {
      this.heartbeatInterval = setInterval(() => {
        this.wsServer.clients.forEach((client: ClientWebSocket) => {
          // the client did not send a pong since the last heartbeat so
          // terminate the connection
          if (client.alive === false) {
            client.terminate()
            return
          }

          client.alive = false
          client.ping()
        })
      }, this.heartbeatMs)
    }

    return new Promise<WebSocketServer>((resolve, reject) => {
      this.wsServer.once('error', (e) => { reject(e) })
      this.wsServer.once('listening', () => { resolve(this) })
      this.server.listen(typeof addrInfo === 'number' ? addrInfo : addrInfo.port)
    })
  }

  async close (): Promise<void> {
    if (this.heartbeatInterval != null) {
      clearInterval(this.heartbeatInterval)
    }

    await new Promise<void>((resolve, reject) => {
      this.server.close((err) => {
        if (err != null) {
          reject(err); return
        }

        resolve()
      })
    })
  }

  address (): string | AddressInfo | null {
    return this.server.address()
  }

  onWsServerConnection (socket: ClientWebSocket, req: http.IncomingMessage): void {
    let addr: string | AddressInfo | null

    try {
      if (req.socket.remoteAddress == null || req.socket.remotePort == null) {
        throw new Error('Remote connection did not have address and/or port')
      }

      addr = this.wsServer.address()

      if (typeof addr === 'string') {
        throw new Error('Cannot listen on unix sockets')
      }

      if (addr == null) {
        throw new Error('Server was closing or not running')
      }
    } catch (err: any) {
      req.destroy(err)
      this.emit('error', err)
      return
    }

    socket.on('pong', () => {
      socket.alive = true
    })

    const stream: DuplexWebSocket = {
      ...duplex(socket, {
        remoteAddress: req.socket.remoteAddress,
        remotePort: req.socket.remotePort
      }),
      localAddress: addr.address,
      localPort: addr.port
    }

    this.emit('connection', stream, req)
  }
}

export function createServer (opts?: ServerOptions): WebSocketServer {
  opts = opts ?? {}

  const server = opts.server ?? (opts.key != null && opts.cert != null ? https.createServer(opts) : http.createServer())
  const wss = new Server(server, opts)

  if (opts.onConnection != null) {
    wss.on('connection', opts.onConnection)
  }

  function proxy (server: http.Server, event: string): http.Server {
    return server.on(event, (...args: any[]) => {
      wss.emit(event, ...args)
    })
  }

  proxy(server, 'listening')
  proxy(server, 'request')
  proxy(server, 'close')

  return wss
}

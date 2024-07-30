import { expect } from 'aegir/chai'
import delay from 'delay'
import Sinon from 'sinon'
import { isNode, isElectronMain } from 'wherearewe'
import * as WS from '../src/index.js'
import WebSocket from '../src/web-socket.js'

describe('ping', () => {
  if (!(isNode || isElectronMain)) {
    return
  }

  let server: WS.WebSocketServer
  let client: WebSocket

  afterEach(async () => {
    if (client != null) {
      client.close()
    }

    if (server != null) {
      await server.close()
    }
  })

  it('server should ping connected clients', async () => {
    server = WS.createServer({
      heartbeatMs: 10
    })
    await server.listen(55214)

    client = new WebSocket('http://127.0.0.1:55214')
    const pongSpy = Sinon.spy(client, 'pong')

    await delay(200)

    expect(client).to.have.property('readyState', WebSocket.OPEN)
    expect(pongSpy).to.have.property('called', true)
  })

  it('server should disconnected unresponsive clients', async () => {
    server = WS.createServer({
      heartbeatMs: 10
    })
    await server.listen(55214)

    client = new WebSocket('http://127.0.0.1:55214')

    // make sure the client will not respond to a ping
    client.pong = () => {}

    await delay(200)

    expect(client).to.have.property('readyState', WebSocket.CLOSED)
  })
})

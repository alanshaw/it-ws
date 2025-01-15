import { expect } from 'aegir/chai'
import delay from 'delay'
import drain from 'it-drain'
import each from 'it-foreach'
import { pipe } from 'it-pipe'
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string'
import * as WS from '../src/index.js'
import WebSocket from '../src/web-socket.js'
import wsurl from './helpers/wsurl.js'

const endpoint = wsurl + '/echo'

describe('duplex', () => {
  it('should close if already closed', async () => {
    const socket = new WebSocket(endpoint)
    const data = [
      uint8ArrayFromString('x'),
      uint8ArrayFromString('y'),
      uint8ArrayFromString('z')
    ]

    const duplex = WS.duplex(socket, { closeOnEnd: true })

    while (true) {
      if (duplex.socket.readyState === WebSocket.OPEN) {
        break
      }

      await delay(100)
    }

    await pipe(
      data,
      duplex,
      drain
    )

    expect(duplex.socket.readyState).to.equal(WebSocket.CLOSED)

    await duplex.close()

    expect(duplex.socket.readyState).to.equal(WebSocket.CLOSED)
  })

  it('should close if already open and done reading data', async () => {
    const socket = new WebSocket(endpoint)
    const data = [
      uint8ArrayFromString('x'),
      uint8ArrayFromString('y'),
      uint8ArrayFromString('z')
    ]
    let count = 0

    const duplex = WS.duplex(socket, { closeOnEnd: false })

    while (true) {
      if (duplex.socket.readyState === WebSocket.OPEN) {
        break
      }

      await delay(100)
    }

    await pipe(
      data,
      duplex,
      (source) => each(source, (item) => {
        expect(item).to.be.ok()
        count++

        if (count === data.length) {
          // verify status is open after draining
          expect(socket.readyState).to.be.eq(WebSocket.OPEN)
          duplex.close().then(() => {
            expect(duplex.socket.readyState).to.equal(WebSocket.CLOSED)
          })
        }
      }),
      drain
    )

    await duplex.close()
  })

  it('should close if connecting', async () => {
    const socket = new WebSocket(endpoint)
    const duplex = WS.duplex(socket, { closeOnEnd: false })

    expect(duplex.socket.readyState).to.equal(WebSocket.CONNECTING)

    await duplex.close()

    expect(duplex.socket.readyState).to.equal(WebSocket.CLOSED)
  })

  it('should close if open', async () => {
    const socket = new WebSocket(endpoint)
    const duplex = WS.duplex(socket, { closeOnEnd: false })

    while (true) {
      if (duplex.socket.readyState === WebSocket.OPEN) {
        break
      }

      await delay(100)
    }

    expect(duplex.socket.readyState).to.equal(WebSocket.OPEN)

    await duplex.close()

    expect(duplex.socket.readyState).to.equal(WebSocket.CLOSED)
  })
})

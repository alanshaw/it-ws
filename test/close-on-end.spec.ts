import { expect } from 'aegir/chai'
import drain from 'it-drain'
import each from 'it-foreach'
import { pipe } from 'it-pipe'
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string'
import * as WS from '../src/index.js'
import WebSocket from '../src/web-socket.js'
import wsurl from './helpers/wsurl.js'

const endpoint = wsurl + '/echo'

describe('close on end', () => {
  it('websocket closed when pull source input ends', async () => {
    const socket = new WebSocket(endpoint)
    const data = [
      uint8ArrayFromString('x'),
      uint8ArrayFromString('y'),
      uint8ArrayFromString('z')
    ]

    void pipe(
      data,
      WS.duplex(socket, { closeOnEnd: true })
    )

    await pipe(
      WS.source(socket),
      drain
    )

    socket.close()
  })

  it('closeOnEnd=false, stream doesn\'t close', async () => {
    const socket = new WebSocket(endpoint)
    const data = [
      uint8ArrayFromString('x'),
      uint8ArrayFromString('y'),
      uint8ArrayFromString('z')
    ]
    let count = 0

    void pipe(
      data,
      WS.duplex(socket, { closeOnEnd: false })
    )

    await pipe(
      WS.source(socket),
      (source) => each(source, (item) => {
        expect(item).to.be.ok()
        count++

        if (count === 3) {
          socket.close()
        }
      }),
      drain
    )
  })
})

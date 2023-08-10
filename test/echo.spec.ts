import { expect } from 'aegir/chai'
import drain from 'it-drain'
import each from 'it-foreach'
import { goodbye } from 'it-goodbye'
import { pipe } from 'it-pipe'
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string'
import * as WS from '../src/index.js'
import WebSocket from '../src/web-socket.js'
import wsurl from './helpers/wsurl.js'

const endpoint = wsurl + '/echo'

describe('echo', () => {
  it('setup echo reading and writing', async () => {
    const socket = new WebSocket(endpoint)
    const expected = [
      uint8ArrayFromString('x'),
      uint8ArrayFromString('y'),
      uint8ArrayFromString('z')
    ]
    let count = 0

    void pipe(
      expected,
      WS.sink(socket, { closeOnEnd: false })
    )

    await pipe(
      WS.source(socket),
      (source) => each(source, (value) => {
        expect(value).to.equalBytes(expected.shift())

        count++

        if (count === 3) {
          socket.close()
        }
      }),
      drain
    )
  })

  it('duplex style', async () => {
    const expected = [
      uint8ArrayFromString('x'),
      uint8ArrayFromString('y'),
      uint8ArrayFromString('z')
    ]
    const socket = new WebSocket(endpoint)
    let count = 0

    await pipe(
      expected,
      WS.duplex(socket, { closeOnEnd: false }),
      (source) => each(source, (value) => {
        expect(value).to.equalBytes(expected.shift())

        count++

        if (count === 3) {
          socket.close()
        }
      }),
      drain
    )
  })

  it('duplex with goodbye handshake', async () => {
    const expected = [
      uint8ArrayFromString('x'),
      uint8ArrayFromString('y'),
      uint8ArrayFromString('z')
    ]
    const socket = new WebSocket(endpoint)
    const pws = WS.duplex(socket)

    await pipe(
      pws,
      goodbye({
        source: expected,
        sink: async source => {
          await pipe(
            source,
            (source) => each(source, (value) => {
              expect(value).to.equalBytes(expected.shift())
            }),
            drain
          )
        }
      }),
      pws
    )
  })
})

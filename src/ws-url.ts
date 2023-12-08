const map = { 'http:': 'ws:', 'https:': 'wss:' }
const defaultProtocol = 'ws:'

export default (url: string, location?: Partial<Location>): URL => {
  if (url.startsWith('//')) {
    url = `${location?.protocol ?? defaultProtocol}${url}`
  }

  if (url.startsWith('/') && location != null) {
    const proto = location.protocol ?? defaultProtocol
    const host = location.host
    const port = location.port != null && host?.endsWith(`:${location.port}`) !== true ? `:${location.port}` : ''
    url = `${proto}//${host}${port}${url}`
  }

  const wsUrl = new URL(url)

  for (const [httpProto, wsProto] of Object.entries(map)) {
    if (wsUrl.protocol === httpProto) {
      wsUrl.protocol = wsProto
    }
  }

  return wsUrl
}

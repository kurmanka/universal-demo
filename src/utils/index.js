export const pages = ['Rudy', 'Example', 'ReduxFirstRouter', 'Universal']

export const nextIndex = index => ++index % pages.length

export const indexFromPath = path => {
  path = path === '/' ? '/Rudy' : path
  return pages.indexOf(path.substr(1))
}

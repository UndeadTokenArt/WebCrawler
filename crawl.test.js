const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL - protocol', () => {
  const input = 'https://wagslane.dev/path'
  const actual = normalizeURL(input)
  const expected = 'wagslane.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL - slash', () => {
  const input = 'https://wagslane.dev/path/'
  const actual = normalizeURL(input)
  const expected = 'wagslane.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL - capitals', () => {
  const input = 'https://wagsLane.Dev/path'
  const actual = normalizeURL(input)
  const expected = 'wagslane.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL - http', () => {
  const input = 'http://wagslane.dev/path'
  const actual = normalizeURL(input)
  const expected = 'wagslane.dev/path'
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML - absolute', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://blog.boot.dev/path/">
            boot.dev Blog
        </a>
    </body>
</html>
`
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML - relative URL', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="/path/">
            boot.dev Blog
        </a>
    </body>
</html>
`
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML - both', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://blog.boot.dev/path1/">
            boot.dev Blog Path One
        <a href="/path2/">
            boot.dev Blog Path two
        </a>
        </a>
    </body>
</html>
`
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML - both', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="invalid">
            Invalid URL
        </a>
        </a>
    </body>
</html>
`
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})
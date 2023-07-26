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

test('getURLsFromHTML - wagslane.dev', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://blog.boot.dev">
            boot.dev Blog
        </a>
    </body>
</html>
`
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/"]
    expect(actual).toEqual(expected)
})
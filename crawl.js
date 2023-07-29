const { JSDOM } = require('jsdom')

async function crawlPage (currentURL) {
    console.log(`activly crawling ${currentURL}`)
    try {
        const resp = await fetch(currentURL)
        
        if (resp.status > 399) {
            console.log(`error in fetch with status code: ${resp.status} on page :${currentURL}`)
            return
        }
        
        const contentType = resp.headers.get('content-type')
        if (!contentType.includes("text/html")) {
            console.log(`non html response, content type: ${contentType}, on page: ${currentURL}`)
            return
        }
        console.log(await resp.text())
    } catch (err) {
        console.log(`error in fetch: ${err.message} on page: ${currentURL}`)
    }
 }

function normalizeURL(url){
    const urlObj = new URL(url)
    let fullPath = `${urlObj.host}${urlObj.pathname}`
    if (fullPath.length > 0 && fullPath.slice(-1) === '/'){
      fullPath = fullPath.slice(0, -1)
    }
    return fullPath
  }
  
 
function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0,1) === '/'){
            //relative
            try {
                const urlObj = new URL(`${baseURL}${linkElement}`)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with reletive url: ${err.message}`)
            }
        } else {
            //absolute
            try {
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with absolute url: ${err.message}`)
            }
            
        }
    }
    return urls
}


  module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
  }
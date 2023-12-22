const {JSDOM} = require('jsdom')

function normalizeURL(url) {
    const urlObj = new URL(url)
    let fullPath = `${urlObj.host}${urlObj.pathname}`
    if (fullPath.length > 0 && fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0, -1)
    }
    return fullPath
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const aEls = dom.window.document.querySelectorAll('a')
    for (const aEl of aEls) {
        if (aEl.href.slice(0, 1) === '/') {
            try {
                urls.push(new URL(aEl.href, baseURL).href)
            } catch (err) {
                console.log(`${err.message}: ${aEl.href}`)
            }
        } else {
            try {
                urls.push(new URL(aEl.href).href)
            } catch (err) {
                console.log(`${err.message}: ${aEl.href}`)
            }
        }
    }
    return urls
}

async function crawlPage(url) {
    try {
        const respo = await fetch(url)
        if (respo.status > 399) {
            console.log(`HTTP Error, status code: ${respo.status}`)
            return
        }
        const cont_type = respo.headers.get('content-type')
        if (!cont_type.includes('text/html')) {
            console.log(`Non HTML response: ${cont_type}`)
            return
        }
        console.log(await respo.text())
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}
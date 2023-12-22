const {crawlPage} = require('./crawl.js')

async function main() {
    if (process.argv.length < 3) {
        console.log('Error: not enough arguments')
        return
    }

    if (process.argv.length > 3) {
        console.log('Error: too many arguments')
        return
    }

    const baseURL = process.argv[2]
    console.log('starting crawl...')

    await crawlPage(baseURL)
}

main()
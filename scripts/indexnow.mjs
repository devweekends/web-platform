// Tells IndexNow (Bing, Yandex, Seznam, Naver and others) which pages exist,
// so new and changed pages are picked up without waiting for a crawl.
//
// Run after a deploy:  node scripts/indexnow.mjs
// The key is public by design: search engines read it from the site to check
// that the request really comes from the site's owner.

const SITE = 'https://www.devweekends.com'
const KEY = '911672a915759017db2b842edfb31730'

const sitemap = await fetch(`${SITE}/sitemap.xml`).then((response) => response.text())
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
if (urls.length === 0) {
  console.error('No URLs found in the sitemap, nothing sent')
  process.exit(1)
}

const keyFile = await fetch(`${SITE}/${KEY}.txt`)
if (!keyFile.ok || (await keyFile.text()).trim() !== KEY) {
  console.error(`The key file ${SITE}/${KEY}.txt is not live yet, nothing sent`)
  process.exit(1)
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls }),
})

// 200 and 202 both mean the list was accepted
console.log(`IndexNow answered ${response.status} for ${urls.length} URLs`)
if (response.status !== 200 && response.status !== 202) {
  console.error(await response.text())
  process.exit(1)
}

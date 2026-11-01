// Notify IndexNow search engines (Bing — which also feeds Copilot and ChatGPT search —
// Yandex, Seznam, Naver…) about every URL in the live sitemap. Run after a deploy:
//   npm run indexnow
const HOST = "www.cloudisoft.com";
const KEY = "5ace1d07bd5091ddede585b270c7f6e2"; // also served at https://www.cloudisoft.com/5ace1d07bd5091ddede585b270c7f6e2.txt

const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) throw new Error("no URLs found in sitemap");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} — submitted ${urlList.length} URLs`);
if (res.status >= 300) process.exit(1);

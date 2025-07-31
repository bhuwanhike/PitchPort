// Change this to your website
import puppeteer from "puppeteer";
import fs from "fs";

const startUrl = "https://pitchport-frontend.onrender.com/";
const visited = new Set();
let allContent = [];

async function scrapePage(browser, url) {
  if (visited.has(url)) return;
  visited.add(url);

  console.log("Scraping:", url);

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  // Extract visible text
  const pageText = await page.evaluate(() => {
    return document.body.innerText.replace(/\s+/g, " ").trim();
  });

  if (pageText.length > 0) {
    allContent.push({ url, text: pageText });
  }

  // Get internal links
  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("a[href]"))
      .map((a) => a.href)
      .filter((href) => href.startsWith(location.origin));
  });

  for (const link of links) {
    await scrapePage(browser, link);
  }

  await page.close();
}

(async () => {
  const browser = await puppeteer.launch();
  await scrapePage(browser, startUrl);
  await browser.close();

  fs.writeFileSync("website_content.json", JSON.stringify(allContent, null, 2));
  console.log(
    `✅ Done. Saved ${allContent.length} pages to website_content.json`
  );
})();

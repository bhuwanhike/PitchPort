import fs from "fs";

const rawData = fs.readFileSync("website_content.json", "utf8");
const pages = JSON.parse(rawData);

function chunkText(text, maxWords = 200) {
  const words = text.split(" ");
  let chunks = [];

  for (let i = 0; i < words.length; i += maxWords) {
    const chunk = words.slice(i, i + maxWords).join(" ");
    chunks.push(chunk);
  }
  return chunks;
}

let chunkedData = [];

pages.forEach((page, pageIndex) => {
  const chunks = chunkText(page.text);
  chunks.forEach((chunk, chunkIndex) => {
    chunkedData.push({
      id: `${pageIndex}-${chunkIndex}`,
      url: page.url,
      text: chunk,
    });
  });
});

fs.writeFileSync("website_chunks.json", JSON.stringify(chunkedData, null, 2));
console.log(
  `✅ Chunked data saved to website_chunks.json (${chunkedData.length} chunks)`
);

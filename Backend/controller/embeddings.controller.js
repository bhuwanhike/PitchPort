import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs/promises";

dotenv.config();

const INPUT_FILE_PATH = "website_chunks.json";
const OUTPUT_FILE_PATH = "website_embeddings.json";

const CHUNK_SIZE = 500;
const CHUNK_OVERLAP = 100;

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
function splitTextIntoChunks(text, chunkSize, chunkOverlap) {
  const chunks = [];
  let startIndex = 0;
  while (startIndex < text.length) {
    let endIndex = Math.min(startIndex + chunkSize, text.length);
    let chunk = text.substring(startIndex, endIndex);
    chunks.push(chunk);
    startIndex += chunkSize - chunkOverlap;
  }
  return chunks;
}

async function generateEmbedding(text) {
  try {
    const model = ai.getGenerativeModel({ model: "embedding-001" });
    const result = await model.embedContent(text);
    // console.log(result.embedding.values);

    // Return the vector for the first request
    return result.embedding.values;
  } catch (error) {
    console.error("Embedding error:", error);
    return null;
  }
}

async function processContentAndEmbed() {
  console.log(`Loading data from ${INPUT_FILE_PATH}...`);
  const fileData = await fs.readFile(INPUT_FILE_PATH, "utf8");
  const pages = JSON.parse(fileData);
  // console.log(pages);
  let processedData = [];

  for (const page of pages) {
    const chunks = splitTextIntoChunks(page.text, CHUNK_SIZE, CHUNK_OVERLAP);
    // console.log(chunks);

    for (let i = 0; i < chunks.length; i++) {
      // console.log(chunkText);
      const chunkText = chunks[i];
      console.log(`Embedding: ${page.url} (chunk ${i + 1}/${chunks.length})`);

      const embedding = await generateEmbedding(chunkText);
      console.log(embedding);
      if (embedding) {
        processedData.push({
          id: `${page.url}_chunk${i}`,
          url: page.url,
          text: chunkText,
          embedding: embedding,
        });
      }
    }
  }

  await fs.writeFile(OUTPUT_FILE_PATH, JSON.stringify(processedData, null, 2));
  console.log(
    `✅ Saved ${processedData.length} embeddings to ${OUTPUT_FILE_PATH}`
  );
}

processContentAndEmbed();

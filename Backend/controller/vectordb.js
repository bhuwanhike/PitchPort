import { ChromaClient } from "chromadb";
import fs from "fs";

const chroma = new ChromaClient({ port: 8000 });
const collectionName = "pitchport";

async function storeEmbeddings() {
  // Create or get the collection
  const collection = await chroma.getOrCreateCollection({
    name: collectionName,
    metadata: { description: "PitchPort website embeddings" },
  });

  // Read embeddings from file
  const data = JSON.parse(fs.readFileSync("website_embeddings.json", "utf-8"));

  // Add each chunk to the DB
  await collection.add({
    ids: data.map((_, i) => `doc-${i}`),
    embeddings: data.map((item) => item.embedding),
    metadatas: data.map((item) => ({
      url: item.url,
      chunk: item.text,
    })),
    documents: data.map((item) => item.text),
  });

  console.log("✅ Embeddings stored in ChromaDB");
}

storeEmbeddings();

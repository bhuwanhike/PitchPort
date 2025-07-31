import fs from "fs";
import { ChromaClient } from "chromadb";

const chroma = new ChromaClient({ port: 8000 }); // or your hosted Chroma
const collectionName = "pitchport";

async function importEmbeddings() {
  console.log("📂 Reading embeddings file...");
  const data = JSON.parse(fs.readFileSync("website_embeddings.json", "utf8"));

  console.log("🔄 Connecting to Chroma...");
  let collection;
  try {
    collection = await chroma.getCollection({ name: collectionName });
    console.log("✅ Found existing collection:", collectionName);
  } catch {
    collection = await chroma.createCollection({ name: collectionName });
    console.log("📦 Created new collection:", collectionName);
  }

  console.log("📥 Importing embeddings...");
  await collection.add({
    ids: data.map((d) => d.id),
    documents: data.map((d) => d.text),
    embeddings: data.map((d) => d.embedding),
    metadatas: data.map((d) => ({ url: d.url })),
  });

  console.log(
    `✅ Imported ${data.length} embeddings into collection "${collectionName}"`
  );
}

importEmbeddings();

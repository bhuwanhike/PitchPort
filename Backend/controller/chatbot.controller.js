import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChromaClient } from "chromadb";

// Initialize Gemini client
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is missing in .env");
}
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Embedding model
const embedModel = ai.getGenerativeModel({ model: "embedding-001" });

// ChromaDB setup
const chroma = new ChromaClient({ port: 8000 }); // change if hosted remotely
const collectionName = "pitchport";

const chatbotController = async (req, res) => {
  // SSE Headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");

  const { message, history } = req.body;

  if (!message) {
    res.write(
      `data: ${JSON.stringify({
        type: "error",
        message: "Message is required",
      })}\n\n`
    );
    return res.end();
  }

  // -----------------------------
  // 1️⃣ Get Chroma RAG context
  // -----------------------------
  let contextText = "";
  try {
    // Create embedding for query
    const queryEmbedding = await embedModel.embedContent({
      content: { parts: [{ text: message }] },
    });
    const vector = queryEmbedding.embedding.values;

    // Get or create Chroma collection
    let collection;

    // collection = await chroma.getCollection({ name: "pitchport" });
    // const results = await collection.get();

    try {
      collection = await chroma.getCollection({ name: collectionName });
    } catch {
      collection = await chroma.createCollection({ name: collectionName });
    }

    // Query Chroma
    const results = await collection.query({
      queryEmbeddings: [vector],
      nResults: 3,
    });

    // Merge retrieved docs into context
    contextText = results.documents.flat().join("\n");
  } catch (err) {
    console.error("❌ Chroma search failed:", err);
    contextText = "";
  }

  // -----------------------------
  // 2️⃣ Build chat prompt with context
  // -----------------------------
  const contents = [];

  // Add previous chat history if available
  if (Array.isArray(history)) {
    history.forEach((msg) => {
      if (msg.role && msg.parts?.length > 0) {
        contents.push({
          role: msg.role,
          parts: msg.parts.map((part) =>
            part.text ? { text: part.text } : part
          ),
        });
      }
    });
  }

  // Add current user query with context
  const userMessageWithContext =
    contextText.trim().length > 0
      ? `Use the context below to answer the question. If the answer is not in the context, say "I don't know".\n\nContext:\n${contextText}\n\nQuestion:\n${message}`
      : message;

  contents.push({ role: "user", parts: [{ text: userMessageWithContext }] });

  // -----------------------------
  // 3️⃣ Gemini Streaming with new SDK
  // -----------------------------
  try {
    const chatModel = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await chatModel.generateContentStream({ contents });

    // Stream chunks to client
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      if (chunkText) {
        res.write(
          `data: ${JSON.stringify({ type: "chunk", text: chunkText })}\n\n`
        );
      }
    }

    res.write(`data: ${JSON.stringify({ type: "end" })}\n\n`);
    res.end();
  } catch (error) {
    console.error("❌ Error during streaming:", error);
    res.write(
      `data: ${JSON.stringify({
        type: "error",
        message: error.message || "An error occurred during streaming.",
      })}\n\n`
    );
    res.end();
  }
};

export default chatbotController;

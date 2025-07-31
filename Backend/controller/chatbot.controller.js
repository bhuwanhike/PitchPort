import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChromaClient } from "chromadb";

const ai = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
const embedModel = ai.getGenerativeModel({ model: "embedding-001" });

const chroma = new ChromaClient({ port: 8000 }); // or your hosted Chroma
const collectionName = "pitchport";

const chatbotController = async (req, res) => {
  // SSE Headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");

  const { message, history } = req.body;

  // if (!message) {
  //   res.write(
  //     `data: ${JSON.stringify({
  //       type: "error",
  //       message: "Message is required",
  //     })}\n\n`
  //   );
  //   return res.end();
  // }

  // -----------------------------
  // 1️⃣ Add RAG (Chroma) context
  // -----------------------------
  let contextText = "";
  try {
    // Embed user question
    const queryEmbedding = await embedModel.embedContent(message);
    const vector = queryEmbedding.embedding.values;

    // Search in Chroma
    // console.log("🔄 Connecting to Chroma...");
    const collection = await chroma.getCollection({ name: collectionName });
    // console.log("✅ Connected to Chroma:", collectionName);

    const results = await collection.query({
      queryEmbeddings: [vector],
      nResults: 3,
    });

    // Combine top results into context text
    contextText = results.documents.flat().join("\n");

    console.log("🔍 Chroma context returned:", contextText);
  } catch (err) {
    console.error("Chroma search failed:", err);
    // Optional: fallback to empty context if Chroma fails
    contextText = "";
  }

  // -----------------------------
  // 2️⃣ Build prompt with context
  // -----------------------------
  const contents = [];

  // Add previous history
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

  // Add current user message with retrieved context
  const userMessageWithContext =
    contextText.trim().length > 0
      ? `Use the context below to answer the question. If the answer is not in the context, say "I don't know."\n\nContext:\n${contextText}\n\nQuestion:\n${message}`
      : message;

  contents.push({ role: "user", parts: [{ text: userMessageWithContext }] });

  // -----------------------------
  // 3️⃣ Gemini Streaming
  // -----------------------------
  try {
    const result = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents,
    });

    for await (const chunk of result) {
      const chunkText = chunk.text;
      if (chunkText) {
        res.write(
          `data: ${JSON.stringify({ type: "chunk", text: chunkText })}\n\n`
        );
      }
    }

    res.write(`data: ${JSON.stringify({ type: "end" })}\n\n`);
    res.end();
  } catch (error) {
    console.error("Error during streaming:", error);
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

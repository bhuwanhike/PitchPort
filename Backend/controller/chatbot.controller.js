import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const chatbotController = async (req, res) => {
  // Set headers for Server-Sent Events (SSE)
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no"); // Important for some proxies like Nginx to prevent buffering

  // Get the user's message and the current conversation history from the request body
  // The frontend sends the full history with each new message for context
  const { message, history } = req.body; // <-- Correctly destructuring 'history' now

  if (!message) {
    // Send an error event if no message is provided
    res.write(
      `data: ${JSON.stringify({
        type: "error",
        message: "Message is required",
      })}\n\n`
    );
    return res.end();
  }

  // Construct the 'contents' array for the Gemini API call
  // It should include the previous conversation history and the current user message
  const contents = [];

  // Add previous conversation history from the frontend to the 'contents' array
  if (Array.isArray(history)) {
    history.forEach((msg) => {
      // Ensure history messages are in the correct format for Gemini's 'contents'
      // which expects { role: "user" | "model", parts: [{ text: "..." }] }
      if (
        msg.role &&
        msg.parts &&
        Array.isArray(msg.parts) &&
        msg.parts.length > 0
      ) {
        contents.push({
          role: msg.role,
          parts: msg.parts.map((part) => {
            if (part.text) return { text: part.text };
            // Handle other part types if your history includes them (e.g., inlineData for images)
            return part;
          }),
        });
      }
    });
  }

  // Add the current user message to the 'contents' array for this turn
  contents.push({ role: "user", parts: [{ text: message }] });

  try {
    // Get the generative model (using gemini-1.5-flash for faster streaming)

    // Generate content with streaming enabled
    const result = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: contents,
    });

    for await (const chunk of result) {
      const chunkText = chunk.text;
      if (chunkText) {
        // Send each text chunk as an SSE data event to the frontend
        // The frontend expects this JSON format for 'chunk' events
        res.write(
          `data: ${JSON.stringify({ type: "chunk", text: chunkText })}\n\n`
        );
      }
    }

    // After the stream ends, send a completion event to the client
    res.write(`data: ${JSON.stringify({ type: "end" })}\n\n`);
    res.end(); // Close the connection
  } catch (error) {
    console.error("Error during streaming:", error);
    // Send an error event to the client if something goes wrong
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

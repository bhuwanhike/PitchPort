import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

// const setContent = async (req, res) => {
//   const { input } = await req.body;
//   return input;
// };

const chatbotController = async (req, res) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const { message } = req.body;
  // console.log(message);
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: message,
    stream: true,
  });
  // console.log(response.text);
  // res.status(200).json({ message: "Chatbot query received" });
  const result = await fetch("http://localhost:5000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: response.text }),
  });
  res.status(200).json({ message: "Chatbot query sent successfully" });
  //   console.log(result);
};

export default chatbotController;

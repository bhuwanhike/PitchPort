import React, { useState, useRef, useEffect, useContext } from "react";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import { AuthContext } from "../contexts/auth-context";

const Chatbot = () => {
  const { isLoggedIn } = useContext(AuthContext); // Uncomment if using actual AuthContext
  const [isOpen, setIsOpen] = useState(false);

  // State to hold the current message being typed by the user
  const [message, setMessage] = useState({
    message: "",
  });

  // State to hold the entire conversation history (user inputs + bot responses)
  // This is the single source of truth for all messages displayed in the chat.
  const [conversationHistory, setConversationHistory] = useState([]);

  // State to manage loading/streaming status (disables input/send button)
  const [isLoading, setIsLoading] = useState(false);

  // Ref for auto-scrolling to the bottom of the chat window
  const chatEndRef = useRef(null);

  // Handles changes in the input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage((prev) => ({ ...prev, [name]: value }));
  };

  // Effect to scroll to the bottom of the chat whenever conversationHistory updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationHistory]);

  // Handles sending the message to the backend and processing the stream
  const handleSendMessage = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)

    const userMessageText = message.message.trim(); // Get and trim the user's message
    if (!userMessageText) {
      // Don't send empty messages
      return;
    }

    setIsLoading(true); // Disable input and send button during the process

    // 1. Optimistically add user's message to history for immediate display
    // This message will animate in using 'animate-slideUp'
    const userMessageId = Date.now() + "-user"; // Unique ID for React key prop
    setConversationHistory((prev) => [
      ...prev,
      { role: "user", parts: [{ text: userMessageText }], id: userMessageId },
    ]);
    setMessage({ message: "" }); // Clear input field immediately

    // 2. Add a placeholder for the bot's streaming response
    // This placeholder will also animate in using 'animate-slideUp'
    const botResponseId = Date.now() + "-bot"; // Unique ID for React key prop
    setConversationHistory((prev) => [
      ...prev,
      {
        role: "model",
        parts: [{ text: "" }],
        id: botResponseId,
        streaming: true,
      }, // Mark as streaming
    ]);

    try {
      // Send the current message and the existing history to the streaming endpoint
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/chat`, // Your streaming backend endpoint
        {
          method: "POST", // Use POST to send message and history
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessageText,
            // Send the current conversation history as context for the LLM
            history: conversationHistory.map((msg) => ({
              role: msg.role,
              parts: msg.parts, // Ensure parts are in the format LLM expects
            })),
          }),
        }
      );

      if (!response.ok) {
        // Handle non-OK HTTP responses (e.g., 400, 500) from the backend
        let errorText = response.statusText || "Streaming connection failed.";
        try {
          const errorData = await response.json();
          errorText = errorData.error || JSON.stringify(errorData);
        } catch (parseError) {
          console.error("Failed to parse error response:", parseError);
          // If response is not JSON, use statusText
        }
        console.error("Backend streaming error:", errorText);
        // Update the bot's placeholder with an error message
        setConversationHistory((prev) =>
          prev.map((msg) =>
            msg.id === botResponseId
              ? {
                  ...msg,
                  parts: [{ text: `Error: ${errorText}` }],
                  streaming: false,
                }
              : msg
          )
        );
        setIsLoading(false); // Re-enable input/send button
        return; // Stop further execution
      }

      // Get a reader for the response body to read the stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8"); // Decoder to convert Uint8Array to string
      let receivedText = ""; // Accumulate streamed text

      // Loop to continuously read chunks from the stream
      while (true) {
        const { done, value } = await reader.read(); // Read the next chunk
        if (done) {
          // Stream has finished
          break;
        }

        const chunk = decoder.decode(value, { stream: true }); // Decode the chunk
        // SSE messages are typically formatted as "data: {json}\n\n"
        const lines = chunk.split("\n"); // Split by newline to process individual SSE events
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const eventData = JSON.parse(line.substring(6)); // Parse the JSON data part
              if (eventData.type === "chunk") {
                receivedText += eventData.text; // Append the new text chunk
                // Update the specific bot message in history with the accumulated text
                setConversationHistory((prev) =>
                  prev.map((msg) =>
                    msg.id === botResponseId
                      ? { ...msg, parts: [{ text: receivedText }] }
                      : msg
                  )
                );
              } else if (eventData.type === "end") {
                // Backend signaled the end of the stream
                setConversationHistory((prev) =>
                  prev.map(
                    (msg) =>
                      msg.id === botResponseId
                        ? { ...msg, streaming: false }
                        : msg // Mark as not streaming
                  )
                );
                setIsLoading(false); // Re-enable input/send button
                return; // Exit the loop
              } else if (eventData.type === "error") {
                // Backend sent an error event
                console.error("Stream error from backend:", eventData.message);
                setConversationHistory((prev) =>
                  prev.map((msg) =>
                    msg.id === botResponseId
                      ? {
                          ...msg,
                          parts: [{ text: `Error: ${eventData.message}` }],
                          streaming: false,
                        }
                      : msg
                  )
                );
                setIsLoading(false);
                return; // Exit the loop
              }
            } catch (parseError) {
              console.warn("Failed to parse SSE line:", line, parseError);
            }
          }
        }
      }
    } catch (error) {
      // Handle network or other fetch-related errors
      console.error("Network or fetch error during streaming:", error);
      // Update the bot's placeholder with a network error message
      setConversationHistory((prev) =>
        prev.map((msg) =>
          msg.id === botResponseId
            ? {
                ...msg,
                parts: [
                  {
                    text: "Error: Failed to connect or stream. Please check network.",
                  },
                ],
                streaming: false,
              }
            : msg
        )
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && conversationHistory.length === 0) {
      const welcomeMssg = {
        role: "model", // Role is 'model' as it's from the chatbot
        parts: [
          {
            text: "Hello! I'm PitchBot, your AI assistant. How can I help you today?",
          },
        ],
        id: "welcome-message",
      };
      setConversationHistory([welcomeMssg]);
    }
  }, [isOpen]);

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-55 right-6 w-96 h-[32rem] z-50 animate-slideUp">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-md blur-lg opacity-75"></div>

          {/* Chat Window Content */}
          <div className="relative w-full h-full bg-slate-800/80 backdrop-blur-lg border border-slate-700/80 rounded-2xl shadow-sm flex flex-col overflow-hidden ">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700/80 flex-shrink-0  ">
              <div className="flex items-center gap-3">
                <Bot className="w-6 h-6 text-cyan-400" />
                <div>
                  <h3 className="font-bold text-white">PitchBot AI</h3>
                  <p className="text-xs text-green-400">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-500 hover:text-red-400"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-grow p-4 space-y-4 overflow-y-auto no-scrollbar">
              {/* Map over the conversationHistory array to display messages */}
              {conversationHistory.map((msg, index) => (
                <div
                  key={msg.id || index} // Use msg.id if available, otherwise index (for optimistic updates)
                  // Apply animate-slideUp to each message container
                  className={`flex animate-slideUp ${
                    // This line applies the animation
                    msg.role === "model" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-pink-700 text-white rounded-br-none"
                        : "bg-cyan-500 text-slate-900 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">
                      {msg.parts[0]?.text}
                      {/* Optional: Add a subtle typing indicator if streaming and it's the bot's message */}
                      {msg.streaming && msg.role === "model" && (
                        <span className="animate-pulse">_</span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} /> {/* Ref for auto-scrolling */}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-slate-700/80 flex-shrink-0">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-3"
              >
                <input
                  type="text"
                  name="message"
                  value={message.message} // Bind value to state
                  onChange={handleChange} // Handle input changes
                  placeholder="Ask me anything..."
                  autoComplete="off"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-full py-2 px-4 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  disabled={isLoading} // Disable input while streaming
                />

                {/* Send button */}
                <button
                  type="submit"
                  className="!bg-cyan-400 text-slate-900 p-2.5 !rounded-full hover:bg-cyan-600 transition-colors cursor-pointer"
                  disabled={isLoading} // Disable button while streaming
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      {isLoggedIn && (
        <div className="fixed bottom-30 right-6 z-50">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-500 blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-300 group-hover:text-white transition-colors"
            >
              {isOpen ? (
                <X className="w-8 h-8" />
              ) : (
                <MessageSquare className="w-8 h-8" />
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;

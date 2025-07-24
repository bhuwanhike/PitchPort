import React, { useState, useContext, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot } from "lucide-react";
// You'll need to import your actual AuthContext
// import { AuthContext } from '../contexts/auth-context';

// Mock AuthContext for standalone demonstration
const AuthContext = React.createContext({ isLoggedIn: true });

const Chatbot = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm PitchBot, your AI assistant. How can I help you find the perfect match today?",
      sender: "bot",
    },
    {
      id: 2,
      text: "I'm looking for early-stage FinTech startups in Bengaluru.",
      sender: "user",
    },
    {
      id: 3,
      text: "Excellent! I've found 3 promising startups matching your criteria. Would you like to see them?",
      sender: "bot",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to the latest message
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const userMessage = { id: Date.now(), text: newMessage, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    // Mock bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: "Searching for more details...",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  // Don't render the component if the user is not logged in
  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-10 right-6 w-96 h-[32rem] z-50 animate-slideUp">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-md blur-lg opacity-75"></div>

          {/* Chat Window Content */}
          <div className="relative w-full h-full bg-slate-800/80 backdrop-blur-lg border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700/80 flex-shrink-0">
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
            <div className="flex-grow p-4 space-y-4 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-cyan-500 text-slate-900 rounded-br-none"
                        : "bg-slate-700 text-slate-300 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-slate-700/80 flex-shrink-0">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-3"
              >
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Ask about startups..."
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-full py-2 px-4 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  type="submit"
                  className="bg-cyan-400 text-slate-900 p-2.5 rounded-full hover:bg-cyan-300 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
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

  
    </>
  );
};

export default Chatbot;

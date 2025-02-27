import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css"; // Ensure this file exists for styling

const Chatbot = () => {
  const [query, setQuery] = useState("");
  const [cdp, setCdp] = useState("segment");
  const [chatHistory, setChatHistory] = useState([]); // Stores chat messages

  const handleAsk = async () => {
    if (!query.trim()) {
      alert("Please enter a question!");
      return;
    }

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000";

      const res = await axios.get(`${backendUrl}/ask`, {
        params: { cdp, query },
      });

      const botResponse = res.data.answer;
      
      // Extract URL from the response
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const match = botResponse.match(urlRegex);
      const link = match ? match[0] : null;

      // Format chatbot response
      const responseMessage = link ? (
        <span>
          Here are the best search results:{" "}
          <a href={link} target="_blank" rel="noopener noreferrer">
            Click Here
          </a>
        </span>
      ) : (
        botResponse
      );

      // Update chat history
      setChatHistory([...chatHistory, { user: query, bot: responseMessage }]);
      setQuery(""); // Clear input field
    } catch (error) {
      console.error("API Error:", error);
      setChatHistory([...chatHistory, { user: query, bot: "Error fetching response from server." }]);
    }
  };

  return (
    <div className="chatbot-container">
      <h2>CDP Support Chatbot</h2>

      <div className="chatbox">
        {chatHistory.map((msg, index) => (
          <div key={index} className="chat-message">
            <p className="user"><strong>User:</strong> {msg.user}</p>
            <p className="bot"><strong>Bot:</strong> {msg.bot}</p>
          </div>
        ))}
      </div>

      <select value={cdp} onChange={(e) => setCdp(e.target.value)}>
        <option value="segment">Segment</option>
        <option value="mparticle">mParticle</option>
        <option value="lytics">Lytics</option>
        <option value="zeotap">Zeotap</option>
      </select>

      <input 
        type="text" 
        placeholder="Ask a question..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <button onClick={handleAsk}>Ask</button>
    </div>
  );
};

export default Chatbot;

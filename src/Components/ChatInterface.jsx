import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChatInterface = ({ vesselId }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const socketRef = useRef(null);

  // Fetch existing chat messages on load
  useEffect(() => {
    const fetchChatHistory = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_NODE_API_BASE_URL}/chat/${vesselId}`);
        setChatMessages(response.data.messages || []);
      } catch (error) {
        console.error("Failed to fetch chat history:", error);
      }
      setLoading(false);
    };
    fetchChatHistory();
  }, [vesselId]);

  // WebSocket setup
  useEffect(() => {
    socketRef.current = new WebSocket(`${import.meta.env.VITE_WS_API_BASE_URL}/?vesselId=${vesselId}`);

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setChatMessages((prevMessages) => [...prevMessages, data]);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [vesselId]);

  // Send new message
  const handleSendMessage = () => {
    if (socketRef.current && newMessage.trim()) {
      const messageData = {
        sender: "User123", // Replace with dynamic sender info if available
        message: newMessage,
      };
      socketRef.current.send(JSON.stringify(messageData));
      setNewMessage("");
    }
  };

  if ( loading ) return <div className="w-100 h-100 d-flex justify-content-center align-items-center">Loading...</div>;

  return (
    <div className="w-100 h-100 p-2" style={{ overflow: "hidden" }}>
      <div className="w-100 h-90" style={{ overflowY: "auto", overflowX: "hidden" }}>
        {chatMessages.map((chat, index) => (
          <div className="row mb-4" key={index}>
            <div className="col-lg-3 text-primary fw-bold">
              {new Date(chat.timestamp).toLocaleTimeString()}
            </div>
            <div className="col-lg-9 text-green p-0">{chat.message}</div>
          </div>
        ))}
      </div>

      <div className="chat-input h-10 w-100 row align-items-center">
        <div className="col-lg-9 h-100">
          <input
            type="text"
            className="form- w-100 h-100 active text-white"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </div>
        <div className="col-lg-3 h-100">
          <button className="button-14 h-100 w-100" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

import React, { useState } from 'react';
// import './Chatbot.css';

const Chatbot = () => {
    const chats: any[] = []
    const [isOpen, setIsOpen] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState(chats);

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (e:any) => {
        setUserInput(e.target.value);
    };

    const handleSendMessage = () => {
        if (userInput.trim()) {
            setChatHistory([...chatHistory, { sender: 'User', message: userInput }]);
            setUserInput('');
            // Simulate a bot response
            setTimeout(() => {
                setChatHistory((prev) => [...prev, { sender: 'Bot', message: 'How can I assist you?' }]);
            }, 1000);
        }
    };

    return (
        <div className={`chatbot ${isOpen ? 'open' : ''}`}>
            <button className="chatbot-toggle" onClick={toggleChatbot}>
                {isOpen ? 'Close' : 'Chat'}
            </button>
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chat-history">
                        {chatHistory.map((chat, index) => (
                            <div key={index} className={`chat-message ${chat.sender.toLowerCase()}`}>
                                <strong>{chat.sender}:</strong> {chat.message}
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={userInput}
                        onChange={handleInputChange}
                        placeholder="Type your message..."
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
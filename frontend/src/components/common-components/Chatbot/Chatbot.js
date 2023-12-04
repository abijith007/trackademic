import { X } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

const ChatBubble = ({ message, time, sender, avatar, isUser }) => {
  const chatAlignment = isUser ? 'flex-row-reverse' : 'flex-row';
  const chatBubbleColor = isUser ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black';
  const chatPosition = isUser ? 'ms-auto' : 'me-auto';

  return (
    <div className={`flex ${chatAlignment} mb-4 items-end gap-2`}>
      <div className="chat-image avatar">
        <div className="w-10 h-10 rounded-full my-auto">
          <img alt={`${sender}'s avatar`} src={avatar} className="rounded-full" />
        </div>
      </div>
      <div className="flex flex-col flex-grow">
        <div className={`chat-header mb-1 ${chatPosition}`}>
          <strong>{sender}</strong>
          <time className="text-xs opacity-50 ml-2">{time}</time>
        </div>
        <div className={`chat-bubble break-words p-2 text-sm ${chatPosition} rounded-md shadow ${chatBubbleColor}`} style={{ maxWidth: '250px' }}>
          {message}
        </div>
      </div>
    </div>
  );
};

const Chatbot = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello! How can I assist you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: false,
      sender: 'AI',
      avatar: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  useEffect(() => {
    console.log('Updated Messages:', messages);
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (newMessage.trim() !== '') {
      try {
        const response = await fetch('http://localhost:3002/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: newMessage }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        console.log('Backend Response:', responseData);

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: newMessage,
            isUser: true,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sender: 'You',
            avatar: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg',
          },
          {
            message: (
              <div>
                New Issue:<br />
                Type: {responseData.issue_type.toUpperCase()}<br />
                Title: {responseData.title}<br />
                Description: {responseData.description}
              </div>
            ),
            isUser: false,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sender: 'AI',
            avatar: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg',
          },
        ]);

        setNewMessage('');
      } catch (error) {
        console.error('Error:', error);
        // Handle errors, e.g., show an error message to the user
      }
    }
  };

  return (
    <div className="fixed bottom-0 right-0 mb-5 mr-4">
      <div className={`transition-transform duration-500 ${showChat ? 'translate-y-12' : 'translate-y-full'} max-w-[450px] w-full rounded-t-xl shadow-xl`}>
        <div className="flex flex-col-reverse">
          <div className="bg-white p-4 flex flex-col justify-between" style={{ height: '400px' }}>
            <div className="overflow-y-auto pr-2 custom-scrollbar">
              {messages.map((msg, index) => (
                <ChatBubble
                  key={index}
                  message={msg.message}
                  time={msg.time}
                  sender={msg.sender}
                  avatar={msg.avatar}
                  isUser={msg.isUser}
                />
              ))}
              <div ref={endOfMessagesRef} />
            </div>
            <form onSubmit={handleSendMessage} className="mt-4 flex items-center">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Type your message..."
              />
              <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded-full">
                ➔
              </button>
            </form>
          </div>
          <button
            onClick={toggleChat}
            className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-t-xl w-full flex justify-between items-center"
          >
            <div className='avatar'>
              <div className="w-8 rounded-full">
                <img src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg" alt="AI Assistant" />
              </div>
            </div>
            <span className='flex-1 text-start ms-4'>AI Assistant</span>
            <X className="cursor-pointer" onClick={toggleChat} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

import React, { useState, useEffect } from 'react';
import { Message } from '../types';
import ChatBox from './ChatBox';
import InputArea from './InputArea';
import { generateResponse } from '../services/ai';

const STORAGE_KEY = 'mithra-chat-history';

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedMessages = localStorage.getItem(STORAGE_KEY);
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.error('Error parsing saved messages:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      text,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const responseText = await generateResponse(text);
      
      const botMessage: Message = {
        id: Date.now() + 1,
        text: responseText,
        isBot: true,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "I apologize, but I encountered an issue. Please try sending your message again in a moment.",
        isBot: true,
        isError: true,
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden flex-1 h-full w-full flex flex-col">
      <ChatBox messages={messages} isLoading={isLoading} />
      <InputArea 
        onSendMessage={handleSendMessage} 
        onClearChat={handleClearChat} 
        isLoading={isLoading} 
      />
    </div>
  );
};

export default ChatBot;
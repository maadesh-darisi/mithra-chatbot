import React, { useRef, useEffect } from 'react';
import { marked } from 'marked';
import { Message } from '../types';

interface ChatBoxProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const renderMessageContent = (text: string, isBot: boolean, isError?: boolean) => {
    if (isBot) {
      return (
        <div 
          className={`prose prose-sm max-w-none ${isError ? 'text-red-600' : 'text-gray-800'}`}
          dangerouslySetInnerHTML={{ __html: marked.parse(text) }} 
        />
      );
    }
    return <p>{text}</p>;
  };

  return (
    <div className="flex-1 overflow-y-auto space-y-4 p-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
        >
          <div
            className={`max-w-[80%] rounded-2xl px-4 py-2 ${
              message.isBot
                ? message.isError
                  ? 'bg-red-50'
                  : 'bg-red-100 shadow-sm'
                : 'bg-green-100 text-gray-800'
            }`}
          >
            {renderMessageContent(message.text, message.isBot, message.isError)}
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-white rounded-2xl px-4 py-2 shadow-sm">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatBox;
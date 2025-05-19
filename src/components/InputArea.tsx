import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2 } from 'lucide-react';

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  onClearChat: () => void;
  isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, onClearChat, isLoading }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white w-full" style={{ minHeight: '72px', display: 'flex', alignItems: 'center' }}>
      <div className="flex items-center gap-2 w-full px-4">
        <div className="flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your feelings..."
            className="w-full px-4 py-4 rounded-full border border-gray-1000 focus:outline-none focus:border-green-1000 text-lg"
            disabled={isLoading}
          />
        </div>
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="px-6 py-4 font-medium text-gray-700 hover:text-green-1000 transition-colors text-lg"
        >
          Send
        </button>
        <button
          onClick={onClearChat}
          className="px-6 py-4 font-medium text-gray-700 hover:text-red-1000 transition-colors text-lg"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}

export default InputArea
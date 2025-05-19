import React from 'react';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex items-center gap-2 p-4">
        <span className="text-green-600">🌿</span>
        <h1 className="text-2xl font-semibold text-green-600">Mithra Chatbot</h1>
      </div>
      <div className="flex-1 flex flex-col">
        <ChatBot />
      </div>
    </div>
  );
}

export default App;
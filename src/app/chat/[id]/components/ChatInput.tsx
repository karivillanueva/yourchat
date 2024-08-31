import Link from 'next/link';
import React, { useState } from 'react';

type ChatInputType = {
  onSend: (message: string) => void;
};

const ChatInput = ({ onSend }: ChatInputType) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex justify-between p-2 bg-white border-t rounded border-gray-300">
      <textarea
        className="w-full h-20 p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-sky-300"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
      />
      <Link
        href={'#'}
        onClick={handleSend}
        className="ml-2 p-2 bg-sky-500 text-white rounded-r-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400"
      >
        Send
      </Link>
    </div>
  );
};

export default ChatInput;

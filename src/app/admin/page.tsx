'use client';
import React, { useEffect, useState } from 'react';
import { Bounce, toast } from 'react-toastify';
import axios from 'axios';

import ChatSummary from './components/ChatSummary';
import { ChatType } from '../types/ChatType';

const AdminDashboard = () => {
  const [chats, setChats] = useState<ChatType[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('/api/chat');
        setChats(response.data);
      } catch (error) {
        toast.error('Error fetching chats', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      }
    };

    fetchChats();
  }, []);

  return (
    <div className="p-4 h-full w-full flex flex-col overflow-scroll">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Administration Dashboard
      </h1>
      {chats.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chats.map((chat) => (
            <ChatSummary chat={chat} key={chat.id} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-10">No chats available</p>
      )}
    </div>
  );
};

export default AdminDashboard;

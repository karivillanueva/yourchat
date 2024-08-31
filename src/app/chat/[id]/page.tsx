'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Bounce, toast } from 'react-toastify';
import axios from 'axios';

import BubbleChat from '@/app/chat/[id]/components/BubbleChat';
import ChatInput from '@/app/chat/[id]/components/ChatInput';
import { CURRENT_USER } from '@/app/utils/constants';
import { MessageType } from '../../types/MessageType';

const ChatPage = () => {
  const params = useParams();
  const router = useRouter();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState(true);
  const chatId = params.id as string;

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await axios.get(`/api/messages?id=${chatId}`);

        setMessages(response.data);
        setLoading(false);
      } catch (error) {
        router.push('/error');
      }
    };

    loadMessages();
  }, [chatId, router]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    try {
      const response = await axios.post('/api/messages/add', {
        chatId,
        sender: CURRENT_USER,
        text,
      });

      setMessages((prevState) => [...prevState, ...response.data]);
    } catch (e) {
      toast.error('Error sending message', {
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

  return (
    <div className="flex h-full bg-white justify-center">
      {!loading && (
        <div className="bg-sky-200 h-full w-full lg:w-[30%] p-2 flex flex-col rounded-md">
          <div
            className="flex h-[100%] overflow-scroll hide-scrollbar flex-col mb-1"
            ref={chatContainerRef}
          >
            {messages.map((item) => (
              <BubbleChat message={item} key={item.id} />
            ))}
          </div>

          <ChatInput onSend={(text) => handleSendMessage(text)} />
        </div>
      )}
    </div>
  );
};

export default ChatPage;

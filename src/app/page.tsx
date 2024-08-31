'use client';

import { useRouter } from 'next/navigation';
import { Bounce, toast } from 'react-toastify';
import axios from 'axios';

import { CHAT_PATH, ADMIN_PATH } from './utils/constants';
import CustomButton from './components/CustomButton';

const Home = () => {
  const router = useRouter();

  const handleStartChat = async () => {
    try {
      const response = await axios.post('/api/chat/start');

      const { id } = response.data;
      if (id) router.push(`${CHAT_PATH}/${id}`);
    } catch (error) {
      toast.error('Error creating new chat', {
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
    <div className="flex flex-col items-center p-20">
      <h1 className="text-6xl font-bold text-center text-sky-300 lg:mt-20">
        YourChat
      </h1>

      <div className="flex flex-col items-center gap-10 mt-16 md:mt-20 lg:flex-row">
        <CustomButton
          title="Start to chat"
          subtitle="Start to chat today to find support"
          handleClick={handleStartChat}
        />
        <CustomButton
          href={ADMIN_PATH}
          title="Admin dashboard"
          subtitle="Review and administrate old chats"
        />
      </div>
    </div>
  );
};

export default Home;

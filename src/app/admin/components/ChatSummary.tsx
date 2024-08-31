'use client';
import Link from 'next/link';

import { ChatType } from '../../types/ChatType';
import { CHAT_PATH } from '../../utils/constants';
import { formatDate } from '../../utils/formatDate';

const ChatSummary = ({ chat }: { chat: ChatType }) => (
  <Link
    href={`${CHAT_PATH}/${chat.id}`}
    className="bg-white p-4 rounded shadow text-left cursor-pointer hover:bg-gray-100 hover:shadow-lg transition duration-200 ease-in-out"
  >
    <h2 className="text-lg font-semibold">Chat ID: {chat.id}</h2>
    <p className="text-sm text-gray-600">User: {chat.user}</p>
    <p className="text-sm text-gray-500">
      Last Message: {formatDate(chat.lastTimestamp)}
    </p>
  </Link>
);

export default ChatSummary;

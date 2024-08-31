'use server';
import { Chat } from '@/models/Chat';
import { connectToMongoDB } from '@/lib/mongodb';
import { transformToMessages } from '@/app/utils/transformToMessage';
import { ChatType } from '@/app/types/ChatType';

export async function getAllChats(): Promise<ChatType[]> {
  try {
    await connectToMongoDB();

    const chats = await Chat.find().exec();

    const response = chats.map((chat) => ({
      id: chat._id.toString(),
      user: chat.user,
      messages: transformToMessages(chat.messages),
      lastTimestamp: chat.lastTimestamp,
    }));

    return response;
  } catch (error) {
    console.error('Error retrieving all chats:', error);
    throw error;
  }
}

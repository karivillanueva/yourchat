'use server';
import { Chat } from './../models/Chat';
import { connectToMongoDB } from './mongodb';
import { MessageType } from '@/app/types/MessageType';
import { transformToMessages } from '@/app/utils/transformToMessage';

export async function getMessagesByChatId(
  chatId: string
): Promise<MessageType[]> {
  try {
    await connectToMongoDB();
    const chat = await Chat.findById(chatId);

    if (!chat) {
      throw new Error(`No chat found with id: ${chatId}`);
    }

    return transformToMessages(chat.messages);
  } catch (error) {
    console.error('Error retrieving messages for chat:', error);
    throw error;
  }
}

'use server';
import { Chat } from './../models/Chat';
import { connectToMongoDB } from './mongodb';
import { getRandomResponse } from '@/app/utils/randomMessage';
import {
  MessageRequestType,
  MessageType,
  SenderEnum,
} from '@/app/types/MessageType';
import { transformMessage } from '@/app/utils/transformToMessage';

async function sendOneMessage({
  chatId,
  sender,
  text,
}: MessageRequestType): Promise<MessageType> {
  try {
    const timestamp = new Date();

    const response = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: {
          messages: {
            sender,
            text,
            timestamp,
          },
        },
        lastTimestamp: timestamp,
      },
      { new: true }
    );

    if (!response?.messages) throw Error('Error sending message');

    const lastMessage = response.messages[response.messages.length - 1];
    return transformMessage(lastMessage);
  } catch (error) {
    console.log('Error sending message:', error);
    throw error;
  }
}

export async function addMessageToChat({
  chatId,
  sender,
  text,
}: MessageRequestType): Promise<MessageType[]> {
  try {
    await connectToMongoDB();
    const user_message = await sendOneMessage({ chatId, sender, text });

    const response = getRandomResponse();
    const bot_message = await sendOneMessage({
      chatId,
      sender: SenderEnum.BOT,
      text: response,
    });

    return [user_message, bot_message];
  } catch (error) {
    console.error('Error adding message to chat:', error);
    throw error;
  }
}

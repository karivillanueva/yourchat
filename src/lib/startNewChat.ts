'use server';
import { Chat } from '../models/Chat';
import { connectToMongoDB } from './mongodb';
import { CURRENT_USER } from '@/app/utils/constants';

export async function startNewChat(): Promise<string> {
  try {
    await connectToMongoDB();

    const newChat = new Chat({
      user: CURRENT_USER,
      messages: [],
      lastTimestamp: new Date(),
    });

    await newChat.save();
    return newChat._id.toString();
  } catch (error) {
    console.log('Error creating new chat:', error);
    throw error;
  }
}

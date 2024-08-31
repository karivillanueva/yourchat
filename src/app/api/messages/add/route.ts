import { NextResponse, NextRequest } from 'next/server';
import { addMessageToChat } from '@/lib/addMessageToChat';

export async function POST(request: NextRequest) {
  try {
    const { chatId, sender, text } = await request.json();
    const newMessages = await addMessageToChat({ chatId, sender, text });
    return NextResponse.json(newMessages);
  } catch (error) {
    console.error('Error adding message to chat:', error);
    return NextResponse.json(
      { error: 'Error adding message to chat' },
      { status: 400 }
    );
  }
}

import { NextResponse, NextRequest } from 'next/server';
import { getMessagesByChatId } from '@/lib/getMessagesByChatId';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const chatId = searchParams.get('id');

    if (!chatId) {
      return NextResponse.json(
        { error: 'Chat ID is required' },
        { status: 400 }
      );
    }

    const messages = await getMessagesByChatId(chatId);
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error retrieving messages for chat:', error);
    return NextResponse.json(
      { error: 'Error retrieving messages for chat' },
      { status: 400 }
    );
  }
}

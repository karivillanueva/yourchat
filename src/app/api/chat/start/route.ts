import { NextResponse } from 'next/server';
import { startNewChat } from '@/lib/startNewChat';

export async function POST() {
  try {
    const id = await startNewChat();
    return NextResponse.json({ id });
  } catch (error) {
    console.error('Error starting new chat:', error);
    return NextResponse.json(
      { error: 'Error starting new chat' },
      { status: 400 }
    );
  }
}

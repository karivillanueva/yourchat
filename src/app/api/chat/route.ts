import { NextResponse } from 'next/server';
import { getAllChats } from '@/lib/getAllChats';

export async function GET() {
  try {
    const chats = await getAllChats();
    return NextResponse.json(chats);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error retrieving all chats' },
      { status: 400 }
    );
  }
}

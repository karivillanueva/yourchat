import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import { jest } from '@jest/globals';

Object.assign(global, { TextDecoder, TextEncoder });

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
}));

const mockStartNewChat = jest.fn();

jest.mock('./src/app/api/chat/start/route', () => ({
  startNewChat: mockStartNewChat,
}));

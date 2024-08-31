import { MessageType } from './MessageType';

export type ChatType = {
  id: string;
  user: string;
  messages: MessageType[];
  lastTimestamp: Date;
};

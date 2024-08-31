export enum SenderEnum {
  USER = 'user',
  BOT = 'bot',
}

export type MessageType = {
  sender: string;
  text: string;
  timestamp: Date;
  id: string;
};

export type MessageRequestType = {
  sender: string;
  text: string;
  chatId: string;
};

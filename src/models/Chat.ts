import mongoose, { Schema, Document, Model } from 'mongoose';

export interface MessageInterface {
  _id: mongoose.Types.ObjectId;
  sender: string;
  text: string;
  timestamp: Date;
}

export interface ChatInterface extends Document {
  _id: mongoose.Types.ObjectId;
  messages: MessageInterface[];
  startTimestamp: Date;
  lastTimestamp: Date;
  user: string;
}

const MessageSchema = new Schema<MessageInterface>({
  sender: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ChatSchema = new Schema<ChatInterface>({
  messages: { type: [MessageSchema], required: true },
  startTimestamp: { type: Date, default: Date.now },
  lastTimestamp: { type: Date },
  user: { type: String, required: true },
});

export const Chat: Model<ChatInterface> =
  mongoose.models?.Chat || mongoose.model<ChatInterface>('Chat', ChatSchema);

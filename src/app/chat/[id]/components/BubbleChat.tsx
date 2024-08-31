import { MessageType, SenderEnum } from '../../../types/MessageType';
import { formatDate } from '../../../utils/formatDate';

const BubbleChat = ({ message }: { message: MessageType }) => {
  const isUser = message.sender !== SenderEnum.BOT;

  return (
    <div
      className={`max-w-[50%] flex flex-col my-2 ${
        isUser ? ' self-end items-end' : 'self-start items-start'
      }`}
    >
      <div
        className={`w-full p-4 rounded-lg ${
          isUser ? 'bg-green-500 text-white' : 'bg-white text-black'
        }`}
      >
        {message.text}
      </div>
      <p className="text-gray-600 text-xs mt-1 mx-2">
        {isUser ? 'You: ' : 'Bot: '}
        {formatDate(message.timestamp)}
      </p>
    </div>
  );
};

export default BubbleChat;

import { render, screen, fireEvent } from '@testing-library/react';
import ChatInput from '@/app/chat/[id]/components/ChatInput';

describe('ChatInput Component', () => {
  it('should render the textarea and button', () => {
    render(<ChatInput onSend={jest.fn()} />);

    const textarea = screen.getByPlaceholderText('Type your message...');
    const button = screen.getByText('Send');

    expect(textarea).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should update the textarea value on change', () => {
    render(<ChatInput onSend={jest.fn()} />);

    const textarea = screen.getByPlaceholderText('Type your message...');
    fireEvent.change(textarea, { target: { value: 'Hello' } });

    expect(textarea).toHaveValue('Hello');
  });

  it('should call onSend and clear the textarea when the send button is clicked', () => {
    const onSendMock = jest.fn();
    render(<ChatInput onSend={onSendMock} />);

    const textarea = screen.getByPlaceholderText('Type your message...');
    const button = screen.getByText('Send');

    fireEvent.change(textarea, { target: { value: 'Hello' } });
    fireEvent.click(button);

    expect(onSendMock).toHaveBeenCalledWith('Hello');
    expect(textarea).toHaveValue('');
  });

  it('should call onSend and clear the textarea when Enter is pressed without Shift', () => {
    const onSendMock = jest.fn();
    render(<ChatInput onSend={onSendMock} />);

    const textarea = screen.getByPlaceholderText('Type your message...');

    fireEvent.change(textarea, { target: { value: 'Hello' } });
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false });

    expect(onSendMock).toHaveBeenCalledWith('Hello');
    expect(textarea).toHaveValue('');
  });

  it('should not call onSend when Enter is pressed with Shift', () => {
    const onSendMock = jest.fn();
    render(<ChatInput onSend={onSendMock} />);

    const textarea = screen.getByPlaceholderText('Type your message...');

    fireEvent.change(textarea, { target: { value: 'Hello' } });
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true });

    expect(onSendMock).not.toHaveBeenCalled();
    expect(textarea).toHaveValue('Hello');
  });
});

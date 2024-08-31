const responses = [
  'Please, I need more information. Can you tell me more?',
  "It's great to hear from you! What information can I provide?",
  "That's great! Thank you for writing",
  'Thank you for getting in touch! What can I assist you with today?',
  'I appreciate your message! What do you need help with?',
];

export function getRandomResponse(): string {
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}

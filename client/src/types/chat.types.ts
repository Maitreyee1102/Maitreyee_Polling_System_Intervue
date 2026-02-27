export type ChatMessage = {
  id: string;
  text: string;
  senderName: string;
  role: 'teacher' | 'student';
  timestamp: string;
};
import { Chat } from 'src/features/chat/domain/chat';
import { User } from 'src/features/user/domain/user';

export interface IMessage {
  id: string;
  chat: Chat;
  author: User;
  text: string;
  created_At: string;
}

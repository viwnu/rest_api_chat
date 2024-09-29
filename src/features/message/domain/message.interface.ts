import { Chat } from 'src/features/chat/domain/chat';
import { ChatBuildResponse } from 'src/features/chat/domain/chat.interface';
import { User } from 'src/features/user/domain/user';
import { UserBuildResponse } from 'src/features/user/domain/user.interface';

export interface IMessage {
  id: string;
  chat: Chat;
  author: User;
  text: string;
  created_At: Date;
}

export interface MessageBuildResponse {
  id: string;
  chat: ChatBuildResponse;
  author: UserBuildResponse;
  text: string;
  created_At: string;
}

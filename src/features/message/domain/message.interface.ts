import { Chat, ChatBuildResponse } from 'src/features/chat/domain';
import { User, UserBuildResponse } from 'src/features/user/domain';

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

import { Chat } from '../domain/chat';

export abstract class ChatRepository {
  abstract save(chat: Chat): Promise<Chat>;
  abstract findByName(name: string): Promise<Chat>;
  abstract findById(id: string): Promise<Chat>;
  abstract findByUserId(userId: string): Promise<Chat[]>;
}

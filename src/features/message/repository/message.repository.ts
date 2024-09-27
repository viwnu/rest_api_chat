import { Message } from '../domain/message';

export abstract class MessageRepository {
  abstract save(chat: Message): Promise<Message>;
  abstract findByChatId(chatId: string): Promise<Message[]>;
}

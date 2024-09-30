import { Message } from '../domain';

export abstract class MessageRepository {
  abstract save(chat: Message): Promise<Message>;
  abstract findByChatId(chatId: string): Promise<Message[]>;
}

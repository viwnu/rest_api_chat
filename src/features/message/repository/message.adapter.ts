import { AdapterRepository } from '@app/core';
import { MessageEntity } from 'src/db/entities';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../domain/message';
import { MessageRepository } from './message.repository';

export class MessageAdapter extends AdapterRepository<Message, MessageEntity> implements MessageRepository {
  logger = new Logger(MessageAdapter.name);
  constructor(@InjectRepository(MessageEntity) private messageRepository: Repository<MessageEntity>) {
    super(messageRepository);
  }
  mapping(entity: Message): Message {
    return Message.mapping(entity);
  }

  async findByChatId(chatId: string): Promise<Message[]> {
    return await this.findAll({ where: { chat: { id: chatId } } })[0];
  }
}

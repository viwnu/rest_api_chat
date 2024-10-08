import { AdapterRepository } from '@app/core';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MessageEntity } from 'src/db/entities';
import { Message } from '../domain';
import { MessageRepository } from '.';

export class MessageAdapter extends AdapterRepository<Message, MessageEntity> implements MessageRepository {
  logger = new Logger(MessageAdapter.name);
  constructor(@InjectRepository(MessageEntity) private messageRepository: Repository<MessageEntity>) {
    super(messageRepository);
  }
  mapping(entity: Message): Message {
    return Message.mapping(entity);
  }

  async findByChatId(chatId: string): Promise<Message[]> {
    const messages = await this.findAll({
      where: { chat: { id: chatId } },
      relations: { author: true, chat: true },
      order: { created_At: 'ASC' },
    });
    return messages[0];
  }
}

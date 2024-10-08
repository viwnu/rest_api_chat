import { AdapterRepository } from '@app/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Chat } from '../domain';
import { ChatEntity } from 'src/db/entities';
import { ChatRepository } from '.';

export class ChatsAdapter extends AdapterRepository<Chat, ChatEntity> implements ChatRepository {
  logger = new Logger(ChatsAdapter.name);
  constructor(@InjectRepository(ChatEntity) private chatRepository: Repository<ChatEntity>) {
    super(chatRepository);
  }
  mapping(entity: Partial<ChatEntity>): Chat {
    return Chat.mapping(entity);
  }

  async findById(id: string): Promise<Chat> {
    return await this.findByOptions({ where: { id } });
  }
  async findByName(name: string): Promise<Chat> {
    return await this.findByOptions({ where: { name } });
  }
  async findByUserId(userId: string): Promise<Chat[]> {
    return (await this.findAll({ where: { users: [{ id: userId }] }, order: { created_At: 'DESC' } }))[0];
  }
}

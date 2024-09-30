import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessageController } from './api';
import { MessageService } from './application';
import { ChatEntity, MessageEntity, UserEntity } from 'src/db/entities';
import { UsersRepository, UsersAdapter } from '../user/repository';
import { ChatRepository, ChatsAdapter } from '../chat/repository';
import { MessageRepository, MessageAdapter } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ChatEntity, MessageEntity])],
  controllers: [MessageController],
  providers: [
    MessageService,
    { provide: UsersRepository, useClass: UsersAdapter },
    { provide: ChatRepository, useClass: ChatsAdapter },
    { provide: MessageRepository, useClass: MessageAdapter },
  ],
})
export class MessageModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatService } from './application';
import { ChatController } from './api';
import { ChatRepository, ChatsAdapter } from './repository';
import { ChatEntity, UserEntity } from 'src/db/entities';
import { UsersRepository, UsersAdapter } from '../user/repository';

@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity, UserEntity])],
  controllers: [ChatController],
  providers: [
    ChatService,
    { provide: ChatRepository, useClass: ChatsAdapter },
    { provide: UsersRepository, useClass: UsersAdapter },
  ],
})
export class ChatModule {}

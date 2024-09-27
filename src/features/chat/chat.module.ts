import { Module } from '@nestjs/common';
import { ChatService } from './application/chat.service';
import { ChatController } from './api/chat.controller';
import { ChatRepository } from './repository/chat.repository';
import { ChatsAdapter } from './repository/chat.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity, UserEntity } from 'src/db/entities';
import { UsersRepository } from '../user/repository/users.repository';
import { UsersAdapter } from '../user/repository/users.adapter';

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

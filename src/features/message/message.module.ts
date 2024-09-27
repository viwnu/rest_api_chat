import { Module } from '@nestjs/common';
import { MessageService } from './application/message.service';
import { MessageController } from './api/message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity, MessageEntity, UserEntity } from 'src/db/entities';
import { UsersRepository } from '../user/repository/users.repository';
import { UsersAdapter } from '../user/repository/users.adapter';
import { ChatRepository } from '../chat/repository/chat.repository';
import { ChatsAdapter } from '../chat/repository/chat.adapter';
import { MessageRepository } from './repository/message.repository';
import { MessageAdapter } from './repository/message.adapter';

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

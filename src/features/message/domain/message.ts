import { Logger } from '@nestjs/common';
import { IsDate, IsString, IsUUID, MaxDate, MinDate, validateSync } from 'class-validator';
import { randomUUID } from 'crypto';

import { IMessage } from './message.interface';
import { Chat } from 'src/features/chat/domain/chat';
import { User } from 'src/features/user/domain/user';

export class Message implements IMessage {
  logger = new Logger(Message.name);
  @IsUUID()
  id: string;

  chat: Chat;

  author: User;

  @IsString()
  text: string;

  @IsDate()
  @MinDate(new Date('1950-01-01Z00:00:00:000Z'))
  @MaxDate(new Date('2070-01-01Z00:00:00:000Z'))
  created_At: string;

  static create(createMessageDto: Partial<IMessage>): Message {
    const newMessage = new Message();
    newMessage.id = randomUUID();
    newMessage.chat = createMessageDto.chat;
    newMessage.author = createMessageDto.author;
    newMessage.text = createMessageDto.text;
    const error = validateSync(newMessage);
    if (!!error.length) {
      error.forEach((e) => newMessage.logger.error(e.constraints));
      throw new Error('Message not valid');
    }
    return newMessage;
  }

  static mapping(messageDto: Partial<IMessage>): Message {
    const newMessage = new Message();
    newMessage.id = messageDto.id;
    newMessage.chat = messageDto.chat;
    newMessage.author = messageDto.author;
    newMessage.text = messageDto.text;
    const error = validateSync(newMessage);
    if (!!error.length) {
      error.forEach((e) => newMessage.logger.error(e.constraints));
      throw new Error('Message not valid');
    }
    return newMessage;
  }
}

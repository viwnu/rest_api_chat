import { Logger } from '@nestjs/common';
import { IsDate, IsOptional, IsString, IsUUID, MaxDate, MinDate, validateSync } from 'class-validator';
import { randomUUID } from 'crypto';

import { IMessage, MessageBuildResponse } from './message.interface';
import { Chat } from 'src/features/chat/domain/chat';
import { User } from 'src/features/user/domain/user';
import { BaseDomain } from '@app/common/base-domain/base.domain';

export class Message extends BaseDomain implements IMessage {
  logger = new Logger(Message.name);
  @IsUUID()
  id: string;

  chat: Chat;

  author: User;

  @IsString()
  text: string;

  @IsOptional()
  @IsDate()
  @MinDate(new Date('1950-01-01Z00:00:00:000Z'))
  @MaxDate(new Date('2070-01-01Z00:00:00:000Z'))
  created_At: Date;

  static create(createMessageDto: Partial<IMessage>): Message {
    const newMessage = new Message();
    newMessage.id = randomUUID();
    newMessage.chat = Chat.mapping(createMessageDto.chat);
    newMessage.author = User.mapping(createMessageDto.author);
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
    newMessage.created_At = messageDto.created_At;
    newMessage.chat = Chat.mapping(messageDto.chat);
    newMessage.author = User.mapping(messageDto.author);
    newMessage.text = messageDto.text;

    const error = validateSync(newMessage);
    if (!!error.length) {
      error.forEach((e) => newMessage.logger.error(e.constraints));
      throw new Error('Message not valid');
    }
    return newMessage;
  }

  static buildResponse(message: IMessage): MessageBuildResponse {
    return {
      ...this.baseBuildResponse(message),
      text: message.text,
      chat: Chat.buildResponse(message.chat),
      author: User.buildResponse(message.author),
    };
  }
}

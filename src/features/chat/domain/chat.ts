import { ChatBuildResponse, IChat } from './chat.interface';
import { User } from 'src/features/user/domain/user';
import { Logger } from '@nestjs/common';
import { IsDate, IsOptional, IsString, IsUUID, MaxDate, MinDate, validateSync } from 'class-validator';
import { randomUUID } from 'crypto';
import { BaseDomain } from '@app/common/base-domain';

export class Chat extends BaseDomain implements IChat {
  logger = new Logger(Chat.name);
  @IsUUID()
  id: string;

  @IsString()
  name: string;
  users: User[];

  @IsOptional()
  @IsDate()
  @MinDate(new Date('1950-01-01Z00:00:00:000Z'))
  @MaxDate(new Date('2070-01-01Z00:00:00:000Z'))
  created_At: Date;

  static create(createChatDto: Partial<Chat>): Chat {
    const newChat = new Chat();
    newChat.id = randomUUID();
    newChat.name = createChatDto.name;
    newChat.users = createChatDto.users ?? [];

    const error = validateSync(newChat);
    if (!!error.length) {
      error.forEach((e) => newChat.logger.error(e.constraints));
      throw new Error('Chat not valid');
    }
    return newChat;
  }

  static mapping(chatDto: Partial<IChat>): Chat {
    const newChat = new Chat();
    newChat.id = chatDto.id;
    newChat.name = chatDto.name;
    newChat.users = User.mappingMany(chatDto.users);
    newChat.created_At = chatDto.created_At;

    const error = validateSync(newChat);
    if (!!error.length) {
      error.forEach((e) => newChat.logger.error(e.constraints));
      throw new Error('Chat not valid');
    }
    return newChat;
  }

  static buildResponse(chat: IChat): ChatBuildResponse {
    return {
      ...this.baseBuildResponse(chat),
      name: chat.name,
      // users: User.buildResponseMany(chat.users),
    };
  }
}

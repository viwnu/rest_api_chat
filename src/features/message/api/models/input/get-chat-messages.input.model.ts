import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsUUID } from 'class-validator';

export class GetChatMessagesInputModel {
  @ApiProperty({
    type: 'string',
    example: '403472a8-deb5-4829-b4ef-7ad9363703c4',
    description: 'Chat id, to find messages in it',
  })
  @IsDefined()
  @IsUUID(4, { each: true })
  chat: string;
}

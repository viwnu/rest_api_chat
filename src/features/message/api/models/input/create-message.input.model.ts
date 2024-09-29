import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, IsUUID } from 'class-validator';

export class CreateMessageInputModel {
  @ApiProperty({
    type: 'string',
    example: '403472a8-deb5-4829-b4ef-7ad9363703c4',
    description: 'Message creator id',
  })
  @IsDefined()
  @IsUUID()
  author: string;

  @ApiProperty({
    type: 'string',
    example: '403472a8-deb5-4829-b4ef-7ad9363703c4',
    description: 'Chat where message will be sent',
  })
  @IsDefined()
  @IsUUID()
  chat: string;

  @ApiProperty({ type: 'string', example: 'Hello Xenomorf`s!', description: 'Name of the Chat' })
  @IsDefined()
  @IsString()
  text: string;
}

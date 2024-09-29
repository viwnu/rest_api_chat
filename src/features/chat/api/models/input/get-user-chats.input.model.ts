import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsUUID } from 'class-validator';

export class GetUserChatsInputModel {
  @ApiProperty({
    type: 'string',
    example: '403472a8-deb5-4829-b4ef-7ad9363703c4',
    description: 'User id, to find him chat',
  })
  @IsDefined()
  @IsUUID(4, { each: true })
  user: string;
}

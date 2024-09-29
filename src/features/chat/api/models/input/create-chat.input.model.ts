import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, IsUUID } from 'class-validator';

export class CreateChatInputModel {
  @ApiProperty({ type: 'string', example: 'district 9', description: 'Name of the Chat' })
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty({
    type: ['string'],
    example: '["403472a8-deb5-4829-b4ef-7ad9363703c4", "c47f3448-0a96-487f-b602-0a4529825fa2"]',
    description: 'User ids, will be added to the new chat',
  })
  @IsDefined()
  @IsUUID(4, { each: true })
  users: string[];
}

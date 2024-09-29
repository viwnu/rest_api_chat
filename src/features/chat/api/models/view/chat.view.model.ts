import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

export class ChatViewModel {
  @ApiProperty({ type: 'string', example: 'c47f3448-0a96-487f-b602-0a4529825fa2', description: 'The unique id of chat' })
  @IsUUID()
  id: string;

  @ApiProperty({ type: 'string', example: 'district 9', description: 'Name of the Chat' })
  @IsString()
  @Exclude()
  name: string;

  @ApiProperty({ type: 'string', example: '2024-09-27 18:51:57.980602', description: 'date then chat was created' })
  created_At: string;
}

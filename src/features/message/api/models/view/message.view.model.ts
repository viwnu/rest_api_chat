import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

import { ChatViewModel } from 'src/features/chat/api/models/view';
import { UserViewModel } from 'src/features/user/api/models/view';

export class MessageViewModel {
  @ApiProperty({ type: 'string', example: 'c47f3448-0a96-487f-b602-0a4529825fa2', description: 'The unique id of chat' })
  @IsUUID()
  id: string;

  @ApiProperty({ type: ChatViewModel, description: 'Chat where message was sended' })
  chat: ChatViewModel;

  @ApiProperty({ type: UserViewModel, description: 'Author of message' })
  author: UserViewModel;

  @ApiProperty({ type: 'string', example: 'I have no idea what i`m doing', description: 'Message content' })
  text: string;

  @ApiProperty({ type: 'string', example: '2024-09-27 18:51:57.980602', description: 'date then message was sended' })
  created_At: string;
}

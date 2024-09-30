import { Controller, Post, Body } from '@nestjs/common';

import { Create400, GetMany } from 'src/common/decorators';
import { MessageService } from '../application';
import { CreateMessageInputModel, GetChatMessagesInputModel } from './models/input';
import { MessageViewModel } from './models/view';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Create400('Send new Message', MessageViewModel)
  @Post('add')
  send(@Body() createMessageInput: CreateMessageInputModel): Promise<MessageViewModel> {
    return this.messageService.create(createMessageInput);
  }

  @GetMany('Get all messages in a chat', [MessageViewModel])
  @Post('get')
  findChatMessages(@Body() findChatMessagesInput: GetChatMessagesInputModel): Promise<MessageViewModel[]> {
    return this.messageService.findChatMessages(findChatMessagesInput.chat);
  }
}

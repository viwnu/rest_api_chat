import { Controller, Post, Body } from '@nestjs/common';
import { MessageService } from '../application/message.service';
import { CreateMessageInputModel } from './models/input/create-message.input.model';
import { MessageViewModel } from './models/view/message.view.model';
import { Create400 } from 'src/common/decorators/create400.decorator';
import { GetMany } from 'src/common/decorators/GetMany.decorator';
import { GetChatMessagesInputModel } from './models/input/get-chat-messages.input.model';

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

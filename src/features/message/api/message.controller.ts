import { Controller, Get, Post, Body } from '@nestjs/common';
import { MessageService } from '../application/message.service';
import { CreateMessageInputModel } from './models/input/create-message.input.model';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('add')
  send(@Body() createMessageInput: CreateMessageInputModel) {
    return this.messageService.create(createMessageInput);
  }

  @Get('get')
  findChatMessages(@Body() findChatMessagesInput: { chat: string }) {
    return this.messageService.findChatMessages(findChatMessagesInput.chat);
  }
}

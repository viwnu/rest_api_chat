import { Controller, Get, Post, Body } from '@nestjs/common';
import { ChatService } from '../application/chat.service';
import { CreateChatInputModel } from './models/input/create-chat.dto';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('add')
  create(@Body() createChatDto: CreateChatInputModel) {
    return this.chatService.create(createChatDto);
  }

  @Get('get')
  findUserChats(@Body() findUserChatsInput: { user: string }) {
    return this.chatService.findUserChats(findUserChatsInput.user);
  }
}

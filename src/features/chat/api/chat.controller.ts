import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Create400, GetMany } from 'src/common/decorators';
import { ChatService } from '../application';
import { CreateChatInputModel, GetUserChatsInputModel } from './models/input';
import { ChatViewModel } from './models/view';

@ApiTags('Chats')
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Create400('Create new chat', ChatViewModel)
  @Post('add')
  async create(@Body() createChatDto: CreateChatInputModel): Promise<ChatViewModel> {
    return await this.chatService.create(createChatDto);
  }

  @GetMany('Get all user chats', [ChatViewModel])
  @Post('get')
  async findUserChats(@Body() findUserChatsInput: GetUserChatsInputModel): Promise<ChatViewModel[]> {
    return await this.chatService.findUserChats(findUserChatsInput.user);
  }
}

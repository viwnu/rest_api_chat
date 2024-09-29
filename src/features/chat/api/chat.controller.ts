import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from '../application/chat.service';
import { CreateChatInputModel } from './models/input/create-chat.input.model';
import { ApiTags } from '@nestjs/swagger';
import { ChatViewModel } from './models/view/chat.view.model';
import { Create400 } from 'src/common/decorators/create400.decorator';
import { GetMany } from 'src/common/decorators/GetMany.decorator';
import { GetUserChatsInputModel } from './models/input/get-user-chats.input.model';

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

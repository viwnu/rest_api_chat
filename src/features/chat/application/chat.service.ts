import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateChatInputModel } from '../api/models/input';
import { ChatViewModel } from '../api/models/view';
import { ChatRepository } from '../repository';
import { UsersRepository } from 'src/features/user/repository';
import { Chat } from '../domain';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly userRepository: UsersRepository,
  ) {}
  async create(createChatInput: CreateChatInputModel): Promise<ChatViewModel> {
    const existingUsers = await this.userRepository.findManyByIds(createChatInput.users);
    if (existingUsers.length === 0) throw new NotFoundException('No users find');
    const existingChat = await this.chatRepository.findByName(createChatInput.name);
    if (existingChat) throw new BadRequestException(`Chat with name ${createChatInput.name} already exist`);
    const newChat = Chat.create({ ...createChatInput, users: existingUsers });
    return Chat.buildResponse(await this.chatRepository.save(newChat));
  }

  // Chat[]
  async findUserChats(userId: string): Promise<ChatViewModel[]> {
    const chats = await this.chatRepository.findByUserId(userId);
    // return chats;
    return chats.map((chat) => Chat.buildResponse(chat));
  }
}

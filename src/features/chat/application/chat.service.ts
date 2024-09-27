import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatInputModel } from '../api/models/input/create-chat.dto';
import { ChatRepository } from '../repository/chat.repository';
import { UsersRepository } from 'src/features/user/repository/users.repository';
import { Chat } from '../domain/chat';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly userRepository: UsersRepository,
  ) {}
  async create(createChatInputModel: CreateChatInputModel) {
    const existingUsers = await this.userRepository.findManyByIds(createChatInputModel.users);
    if (existingUsers.length === 0) throw new NotFoundException('No users find');
    const existingChat = await this.chatRepository.findByName(createChatInputModel.name);
    if (!existingChat) throw new BadRequestException(`Chat with name${createChatInputModel.name} already exist`);
    const newChat = Chat.create({ ...createChatInputModel, users: existingUsers });
    return await this.chatRepository.save(newChat);
  }

  async findUserChats(userId: string): Promise<Chat[]> {
    return await this.chatRepository.findByUserId(userId);
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatInputModel } from '../api/models/input/create-chat.input.model';
import { ChatRepository } from '../repository/chat.repository';
import { UsersRepository } from 'src/features/user/repository/users.repository';
import { Chat } from '../domain/chat';
import { ChatViewModel } from '../api/models/view/chat.view.model';

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

  async findUserChats(userId: string): Promise<ChatViewModel[]> {
    const chats = await this.chatRepository.findByUserId(userId);
    return chats.map((chat) => Chat.buildResponse(chat));
  }
}

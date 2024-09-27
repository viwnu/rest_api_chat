import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/features/user/repository/users.repository';
import { ChatRepository } from 'src/features/chat/repository/chat.repository';
import { MessageRepository } from '../repository/message.repository';
import { CreateMessageInputModel } from '../api/models/input/create-message.input.model';
import { Message } from '../domain/message';

@Injectable()
export class MessageService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly chatRepository: ChatRepository,
    private readonly messageRepository: MessageRepository,
  ) {}

  async create(createMessageInput: CreateMessageInputModel) {
    const existingUser = await this.userRepository.findById(createMessageInput.author);
    if (!existingUser) throw new ForbiddenException('User is not valid');
    const existingChat = await this.chatRepository.findById(createMessageInput.chat);
    if (!existingChat) throw new BadRequestException('Chat not found');
    const newMessage = Message.create({ author: existingUser, chat: existingChat, text: createMessageInput.text });
    return await this.messageRepository.save(newMessage);
  }

  async findChatMessages(chatId: string): Promise<Message[]> {
    return await this.messageRepository.findByChatId(chatId);
  }
}

import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';

import { UsersRepository } from 'src/features/user/repository';
import { ChatRepository } from 'src/features/chat/repository';
import { MessageRepository } from '../repository';
import { Message } from '../domain';
import { CreateMessageInputModel } from '../api/models/input';
import { MessageViewModel } from '../api/models/view';

@Injectable()
export class MessageService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly chatRepository: ChatRepository,
    private readonly messageRepository: MessageRepository,
  ) {}

  async create(createMessageInput: CreateMessageInputModel): Promise<MessageViewModel> {
    const existingUser = await this.userRepository.findById(createMessageInput.author);
    if (!existingUser) throw new ForbiddenException('User is not valid');
    const existingChat = await this.chatRepository.findById(createMessageInput.chat);
    if (!existingChat) throw new BadRequestException('Chat not found');
    const newMessage = Message.create({ author: existingUser, chat: existingChat, text: createMessageInput.text });
    return Message.buildResponse(await this.messageRepository.save(newMessage));
  }

  async findChatMessages(chatId: string): Promise<MessageViewModel[]> {
    const messages = await this.messageRepository.findByChatId(chatId);
    return messages.map((message) => Message.buildResponse(message));
  }
}

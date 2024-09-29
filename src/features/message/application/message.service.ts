import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/features/user/repository/users.repository';
import { ChatRepository } from 'src/features/chat/repository/chat.repository';
import { MessageRepository } from '../repository/message.repository';
import { CreateMessageInputModel } from '../api/models/input/create-message.input.model';
import { Message } from '../domain/message';
import { MessageViewModel } from '../api/models/view/message.view.model';

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

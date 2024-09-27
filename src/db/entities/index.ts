import { UserEntity } from './user.entity';
import { ChatEntity } from './chat.entity';
import { MessageEntity } from './message.entity';

export * from './user.entity';
export * from './chat.entity';
export * from './message.entity';
export const ENTITES = [UserEntity, ChatEntity, MessageEntity];

import { BaseEntity } from '@app/core';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ChatEntity } from './chat.entity';
import { UserEntity } from './user.entity';

@Entity()
export class MessageEntity extends BaseEntity {
  @ManyToOne(() => ChatEntity)
  chat: ChatEntity;

  @ManyToOne(() => UserEntity)
  author: UserEntity;

  @Column('varchar', { length: 200 })
  text: string;
}

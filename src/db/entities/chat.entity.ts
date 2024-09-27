import { BaseEntity } from '@app/core';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class ChatEntity extends BaseEntity {
  @Column('varchar', { length: 40 })
  name: string;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  users: UserEntity[];
}

import { BaseEntity } from '@app/core';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @Column('varchar', { length: 40, unique: true })
  username: string;
}

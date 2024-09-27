import { AdapterRepository } from '@app/core';
import { User } from '../domain/user';
import { UserEntity } from 'src/db/entities';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersRepository } from './users.repository';

export class UsersAdapter extends AdapterRepository<User, UserEntity> implements UsersRepository {
  logger = new Logger(UsersAdapter.name);
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {
    super(userRepository);
  }

  mapping(entity: User): User {
    return User.mapping(entity);
  }

  async findById(id: string): Promise<User> {
    return await this.findByOptions({ where: { id } });
  }

  async findManyByIds(ids: string[]): Promise<User[]> {
    return await this.findAll({ where: ids.map((id) => ({ id })) })[0];
  }

  async findByName(username: string): Promise<User> {
    return await this.findByOptions({ where: { username } });
  }
}

import { AdapterRepository } from '@app/core';
import { User } from '../domain/user';
import { UserEntity } from 'src/db/entities';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UsersRepository } from '.';

export class UsersAdapter extends AdapterRepository<User, UserEntity> implements UsersRepository {
  logger = new Logger(UsersAdapter.name);
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {
    super(userRepository);
  }

  mapping(entity: Partial<UserEntity>): User {
    return User.mapping(entity);
  }

  async findById(id: string): Promise<User> {
    return await this.findByOptions({ where: { id } });
  }

  async findManyByIds(ids: string[]): Promise<User[]> {
    // const finded = await this.findAll({ where: { id: In(ids) } })[0];
    const finded = await this.userRepository.findBy({ id: In(ids) });
    return finded.map((user) => this.mapping(user));
  }

  async findByName(username: string): Promise<User> {
    return await this.findByOptions({ where: { username } });
  }
}

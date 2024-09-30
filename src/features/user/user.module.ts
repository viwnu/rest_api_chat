import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from 'src/db/entities';
import { UserController } from './api';
import { UserService } from './application';
import { UsersRepository, UsersAdapter } from './repository';

@Module({
  controllers: [UserController],
  providers: [UserService, { provide: UsersRepository, useClass: UsersAdapter }],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UserModule {}

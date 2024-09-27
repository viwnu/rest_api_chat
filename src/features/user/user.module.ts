import { Module } from '@nestjs/common';
import { UserService } from './application/user.service';
import { UserController } from './api/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities';
import { UsersRepository } from './repository/users.repository';
import { UsersAdapter } from './repository/users.adapter';

@Module({
  controllers: [UserController],
  providers: [UserService, { provide: UsersRepository, useClass: UsersAdapter }],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UserModule {}

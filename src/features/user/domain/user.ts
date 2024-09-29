import { IsDate, IsOptional, IsString, IsUUID, MaxDate, MinDate, validateSync } from 'class-validator';
import { IUser, UserBuildResponse } from './user.interface';
import { Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { BaseDomain } from '@app/common/base-domain/base.domain';

export class User extends BaseDomain implements IUser {
  logger = new Logger(User.name);
  @IsUUID()
  id: string;

  @IsString()
  username: string;

  @IsOptional()
  @IsDate()
  @MinDate(new Date('1950-01-01Z00:00:00:000Z'))
  @MaxDate(new Date('2070-01-01Z00:00:00:000Z'))
  created_At: Date;

  static create(createUserDto: Partial<User>): User {
    const newUser = new User();
    newUser.id = randomUUID();
    newUser.username = createUserDto.username;
    const error = validateSync(newUser);
    if (!!error.length) {
      error.forEach((e) => newUser.logger.error(e.constraints));
      throw new Error('User not valid');
    }
    return newUser;
  }

  static mapping(userDto: Partial<IUser>): User {
    const newUser = new User();
    newUser.id = userDto.id;
    newUser.username = userDto.username;
    newUser.created_At = userDto.created_At;
    const error = validateSync(newUser);
    if (!!error.length) {
      error.forEach((e) => {
        console.error(e);
        newUser.logger.error(e.constraints);
      });
      throw new Error('User not valid');
    }
    return newUser;
  }

  static buildResponse(user: IUser): UserBuildResponse {
    return {
      ...this.baseBuildResponse(user),
      username: user.username,
    };
  }
}

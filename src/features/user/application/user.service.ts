import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from '../repository/users.repository';
import { CreateUserInputModel } from '../api/models/input/create-user.input.model';
import { User } from '../domain/user';
import { UserViewModel } from '../api/models/view/user.view.model';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserInputModel): Promise<UserViewModel> {
    this.logger.log(`In ${this.create.name} handler with: ${JSON.stringify(createUserDto)}`);
    const existingUser = await this.usersRepository.findByName(createUserDto.username);
    if (existingUser) throw new ForbiddenException('User Already exist');
    const newUser = User.create(createUserDto);
    return User.buildResponse(await this.usersRepository.save(newUser));
  }
}

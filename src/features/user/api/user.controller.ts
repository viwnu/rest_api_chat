import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Create } from 'src/common/decorators';
import { UserService } from '../application';
import { CreateUserInputModel } from './models/input';
import { UserViewModel } from './models/view';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Create('User creating', UserViewModel)
  @Post('add')
  async create(@Body() createUserDto: CreateUserInputModel): Promise<UserViewModel> {
    return await this.userService.create(createUserDto);
  }
}

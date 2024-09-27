import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../application/user.service';
import { CreateUserInputModel } from './models/input/create-user.input.model';
import { UserViewModel } from './models/view/user.view.model';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add')
  async create(@Body() createUserDto: CreateUserInputModel): Promise<UserViewModel> {
    return await this.userService.create(createUserDto);
  }
}

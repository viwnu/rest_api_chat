import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../application/user.service';
import { CreateUserInputModel } from './models/input/create-user.input.model';
import { UserViewModel } from './models/view/user.view.model';
import { Create } from 'src/common/decorators/create.decorator';

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

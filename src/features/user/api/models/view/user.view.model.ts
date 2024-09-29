import { ApiProperty } from '@nestjs/swagger';

export class UserViewModel {
  @ApiProperty({ type: 'string', example: 'c47f3448-0a96-487f-b602-0a4529825fa2', description: 'The unique id of user' })
  id: string;

  @ApiProperty({ type: 'string', example: 'user', description: 'The unique name of user' })
  username: string;

  @ApiProperty({ type: 'string', example: '2024-09-27 18:51:57.980602', description: 'date chat user was created' })
  created_At: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateUserInputModel {
  @ApiProperty({ type: 'string', example: 'user', description: 'The unique name of user' })
  @IsDefined()
  @IsString()
  username!: string;
}

import { IsDefined, IsString } from 'class-validator';

export class CreateUserInputModel {
  @IsDefined()
  @IsString()
  username: string;
}

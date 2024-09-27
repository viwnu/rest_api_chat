import { PartialType } from '@nestjs/mapped-types';
import { CreateUserInputModel } from './create-user.input.model';

export class UpdateUserInputModel extends PartialType(CreateUserInputModel) {}

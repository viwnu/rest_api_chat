import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageInputModel } from './create-message.input.model';

export class UpdateMessageInputModel extends PartialType(CreateMessageInputModel) {}

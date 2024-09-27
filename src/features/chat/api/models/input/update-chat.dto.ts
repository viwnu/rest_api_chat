import { PartialType } from '@nestjs/mapped-types';
import { CreateChatInputModel } from './create-chat.dto';

export class UpdateChatDto extends PartialType(CreateChatInputModel) {}

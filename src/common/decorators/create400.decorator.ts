import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Create } from './';

export function Create400(title: string, view: any) {
  return applyDecorators(ApiResponse({ status: 400, description: 'Bad Request exception object' }), Create(title, view));
}

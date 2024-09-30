import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function Create(title: string, view: any) {
  return applyDecorators(
    ApiOperation({ summary: title }),
    ApiResponse({ status: 201, type: view }),
    ApiResponse({ status: 403, description: 'Forbidden exception object' }),
  );
}

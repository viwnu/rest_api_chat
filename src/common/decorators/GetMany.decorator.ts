import { ClassSerializerInterceptor, UseInterceptors, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function GetMany(title: string, view: any) {
  return applyDecorators(
    ApiOperation({ summary: title }),
    ApiResponse({ status: 200, type: view }),
    UseInterceptors(ClassSerializerInterceptor),
  );
}

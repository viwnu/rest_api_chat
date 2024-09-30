import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { AllExceptionsFilter } from '@app/common/filters';
import { TypeOrmConfigService } from 'src/db';
import { UserModule } from './user';
import { ChatModule } from './chat';
import { MessageModule } from './message';

@Module({
  imports: [
    UserModule,
    ChatModule,
    MessageModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(TypeOrmConfigService()),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}

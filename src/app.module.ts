import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './users/user.service';
import { ConversionApiService } from './facebook/conversion.api.service';
import config, { validate } from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      validate,
    }),
  ],
  controllers: [AppController],
  providers: [PrismaService, UserService, ConversionApiService],
})
export class AppModule {}

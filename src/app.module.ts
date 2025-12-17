import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from '../libs/prisma/src';
import { ConfigModule } from '@nestjs/config';
import { BearerStrategy } from './common/strategy';

@Module({
  imports: [
    { ...HttpModule.register({}), global: true },
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRoot({ isGlobal: true }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, BearerStrategy],
  exports: [HttpModule],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '@app/prisma';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    { ...HttpModule.register({}), global: true },
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRoot({ isGlobal: true }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [HttpModule],
})
export class AppModule {}

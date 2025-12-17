import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from '../libs/prisma/src';
import { ConfigModule } from '@nestjs/config';
import { BearerStrategy } from './common/strategy';
import { UsersModule } from './modules/users/users.module';
import { DateCoursesModule } from './modules/date-courses/date-courses.module';

@Module({
  imports: [
    { ...HttpModule.register({}), global: true },
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    DateCoursesModule,
  ],
  controllers: [AppController],
  providers: [BearerStrategy],
  exports: [HttpModule],
})
export class AppModule {}

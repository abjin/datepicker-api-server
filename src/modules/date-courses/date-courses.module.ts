import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DateCoursesService } from './date-courses.service';
import { DateCoursesController } from './date-courses.controller';

@Module({
  imports: [ConfigModule],
  providers: [DateCoursesService],
  controllers: [DateCoursesController],
})
export class DateCoursesModule {}

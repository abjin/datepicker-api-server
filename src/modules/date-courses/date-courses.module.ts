import { Module } from '@nestjs/common';
import { DateCoursesService } from './date-courses.service';
import { DateCoursesController } from './date-courses.controller';

@Module({
  providers: [DateCoursesService],
  controllers: [DateCoursesController],
})
export class DateCoursesModule {}

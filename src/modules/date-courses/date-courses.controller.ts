import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { DateCoursesService } from './date-courses.service';
import { CreateDateCourseDto } from './dtos/create-date-course.dto';
import { DateCourseResponseDto } from './dtos/date-course-response.dto';
import { BearerGuard } from '../../common/guard';

@ApiTags('데이트 코스')
@ApiBearerAuth()
@Controller('date-courses')
@UseGuards(BearerGuard)
export class DateCoursesController {
  constructor(private readonly dateCoursesService: DateCoursesService) {}

  @Post()
  @ApiOperation({
    summary: 'AI 기반 데이트 코스 생성',
    description:
      '지역, 예산, 관심사를 기반으로 AI가 추천하는 데이트 코스를 생성합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '데이트 코스가 성공적으로 생성되었습니다.',
    type: DateCourseResponseDto,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청입니다.' })
  @ApiResponse({ status: 401, description: '인증이 필요합니다.' })
  @ApiResponse({ status: 500, description: '서버 오류가 발생했습니다.' })
  async create(
    @Body() createDateCourseDto: CreateDateCourseDto,
  ): Promise<DateCourseResponseDto> {
    return await this.dateCoursesService.createDateCourse(createDateCourseDto);
  }
}

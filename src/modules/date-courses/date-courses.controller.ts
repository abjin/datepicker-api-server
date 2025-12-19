import {
  Controller,
  Post,
  Body,
  UseGuards,
  Res,
  Get,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { DateCoursesService } from './date-courses.service';
import { CreateDateCourseDto } from './dtos/create-date-course.dto';
import { DateCourseResponseDto } from './dtos/date-course-response.dto';
import { GetDateCoursesQueryDto } from './dtos/get-date-courses-query.dto';
import { CourseListItemDto } from './dtos/course-list-response.dto';
import { BearerGuard } from '../../common/guard';
import type { Response } from 'express';

@ApiTags('데이트 코스')
@ApiBearerAuth()
@Controller('date-courses')
@UseGuards(BearerGuard)
export class DateCoursesController {
  constructor(private readonly dateCoursesService: DateCoursesService) {}

  @Get()
  @ApiOperation({
    summary: '데이트 코스 목록 조회',
    description:
      '저장된 데이트 코스 목록을 조회합니다. 정렬 기준을 지정할 수 있습니다.',
  })
  @ApiResponse({
    status: 200,
    description: '데이트 코스 목록이 성공적으로 조회되었습니다.',
    type: [CourseListItemDto],
  })
  @ApiResponse({ status: 401, description: '인증이 필요합니다.' })
  findAll(@Query() query: GetDateCoursesQueryDto) {
    return this.dateCoursesService.findAll(query);
  }

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
  async create(@Body() dto: CreateDateCourseDto, @Res() resposne: Response) {
    const result = await this.dateCoursesService.createDateCourse(dto);
    resposne.send(result);
    await this.dateCoursesService.saveDateCourse(
      result,
      dto.region,
      dto.budget,
    );
  }
}

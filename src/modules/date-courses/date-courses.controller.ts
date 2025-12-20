import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Query,
  Param,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { DateCoursesService } from './date-courses.service';
import { CreateDateCourseDto } from './dtos/create-date-course.dto';
import { GetDateCoursesQueryDto } from './dtos/get-date-courses-query.dto';
import { CourseListItemDto } from './dtos/course-list-response.dto';
import { BearerGuard } from '../../common/guard';
import { Public } from '../../common/public.decorator';
import express from 'express';

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

  @Get('bookmarks')
  @ApiOperation({
    summary: '북마크한 데이트 코스 목록 조회',
    description:
      '현재 로그인한 사용자가 북마크한 데이트 코스 목록을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '북마크 목록이 성공적으로 조회되었습니다.',
    type: [CourseListItemDto],
  })
  @ApiResponse({ status: 401, description: '인증이 필요합니다.' })
  getBookmarks(@Req() req: express.Request) {
    const userId = req.user!.id;
    return this.dateCoursesService.getBookmarks(userId);
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
    type: CourseListItemDto,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청입니다.' })
  @ApiResponse({ status: 401, description: '인증이 필요합니다.' })
  @ApiResponse({ status: 500, description: '서버 오류가 발생했습니다.' })
  async create(@Body() dto: CreateDateCourseDto): Promise<CourseListItemDto> {
    const result = await this.dateCoursesService.createDateCourse(dto);
    return this.dateCoursesService.saveDateCourse(
      result,
      dto.region,
      dto.budget,
    );
  }

  @Post(':id/views')
  @ApiOperation({
    summary: '데이트 코스 조회수 증가',
    description:
      '특정 데이트 코스의 조회수를 증가시킵니다. 유저당 한 번만 카운트됩니다.',
  })
  @ApiResponse({
    status: 201,
    description: '조회수가 성공적으로 증가되었습니다.',
  })
  @ApiResponse({ status: 401, description: '인증이 필요합니다.' })
  @ApiResponse({ status: 404, description: '데이트 코스를 찾을 수 없습니다.' })
  incrementView(
    @Param('id', ParseIntPipe) courseId: number,
    @Req() req: express.Request,
  ) {
    const userId = req.user!.id;
    return this.dateCoursesService.incrementView(userId, courseId);
  }

  @Post(':id/bookmark')
  @ApiOperation({
    summary: '데이트 코스 북마크 생성',
    description: '특정 데이트 코스를 북마크에 추가합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '북마크가 성공적으로 생성되었습니다.',
  })
  @ApiResponse({ status: 400, description: '잘못된 요청입니다.' })
  @ApiResponse({ status: 401, description: '인증이 필요합니다.' })
  @ApiResponse({ status: 404, description: '데이트 코스를 찾을 수 없습니다.' })
  @ApiResponse({ status: 409, description: '이미 북마크한 코스입니다.' })
  createBookmark(
    @Param('id', ParseIntPipe) courseId: number,
    @Req() req: express.Request,
  ) {
    const userId = req.user!.id;
    return this.dateCoursesService.createBookmark(userId, courseId);
  }

  @Get(':id/share')
  @Public()
  @ApiOperation({
    summary: '데이트 코스 공유하기',
    description:
      '공유 링크를 통해 데이트 코스를 조회합니다. 인증이 필요하지 않습니다.',
  })
  @ApiResponse({
    status: 200,
    description: '데이트 코스가 성공적으로 조회되었습니다.',
    type: CourseListItemDto,
  })
  @ApiResponse({ status: 404, description: '데이트 코스를 찾을 수 없습니다.' })
  async getSharedCourse(
    @Param('id', ParseIntPipe) courseId: number,
  ): Promise<CourseListItemDto> {
    return this.dateCoursesService.getSharedCourse(courseId);
  }
}

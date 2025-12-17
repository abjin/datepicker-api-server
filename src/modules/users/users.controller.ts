import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { BearerGuard } from '../../common/guard';
import express from 'express';

@ApiTags('사용자')
@ApiBearerAuth()
@Controller('user')
@UseGuards(BearerGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({
    summary: '내 정보 조회',
    description: '현재 로그인한 사용자의 정보를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '사용자 정보 조회 성공',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 401, description: '인증 실패' })
  getUser(@Req() req: express.Request): UserResponseDto {
    return new UserResponseDto(req.user!);
  }

  @Put('me')
  @ApiOperation({
    summary: '내 정보 수정',
    description: '현재 로그인한 사용자의 정보를 수정합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '사용자 정보 수정 성공',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  async updateUser(
    @Req() req: express.Request,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.updateUser(
      req.user!.id,
      updateUserDto,
    );
    return new UserResponseDto(user);
  }
}

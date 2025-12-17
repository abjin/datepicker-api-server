import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { BearerGuard } from '../../common/guard';
import express from 'express';

@Controller('user')
@UseGuards(BearerGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getUser(@Req() req: express.Request) {
    return req.user;
  }

  @Put('me')
  async updateUser(
    @Req() req: express.Request,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(req.user!.id, updateUserDto);
  }
}

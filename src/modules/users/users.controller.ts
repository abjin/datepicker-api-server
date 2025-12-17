import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { BearerGuard } from '../../common/guard';
import express from 'express';

@Controller('user')
@UseGuards(BearerGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getUser(@Req() req: express.Request) {
    return req.user;
  }

  @Put('me')
  async updateUser(
    @Req() req: express.Request,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(req.user!.id, updateUserDto);
  }
}

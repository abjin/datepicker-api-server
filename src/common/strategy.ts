import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaService } from '../../libs/prisma/src';
import { Strategy } from 'passport-http-bearer';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(private prisma: PrismaService) {
    super();
  }

  async validate(requestToken: string) {
    const token = await this.prisma.token.findUniqueOrThrow({
      where: { token: requestToken },
    });
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: token?.userId },
    });
    return user;
  }
}

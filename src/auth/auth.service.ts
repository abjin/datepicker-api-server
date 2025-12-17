import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { GoogleTokenPayload } from '../@types';
import { PrismaService } from '../../libs/prisma/src';
import { randomBytes } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { $Enums, User } from '../../libs/prisma/src/generated';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
  ) {}

  public async googleLoginOrSignup(accountId: string, idToken: string) {
    const account = await this.prismaService.account.findUnique({
      where: { id: accountId },
    });

    if (account) {
      return this.googleLogin(account.userId);
    } else {
      return this.googleSignup(accountId, idToken);
    }
  }

  private async googleLogin(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    const token = this.createToken(userId);

    return { token, user };
  }

  private async googleSignup(id: string, idToken: string) {
    const googleTokenInfo = await this.getGoogleTokenInfo(idToken);
    const user = await this.createUser(id, googleTokenInfo);
    const token = await this.createToken(user.id);
    return { token, user };
  }

  private async getGoogleTokenInfo(
    idToken: string,
  ): Promise<GoogleTokenPayload> {
    const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`;
    const response =
      await this.httpService.axiosRef.get<GoogleTokenPayload>(url);
    return response.data;
  }

  private async createUser(
    id: string,
    tokenInfo: GoogleTokenPayload,
  ): Promise<User> {
    const userId = this.generateUserId();

    const [user] = await this.prismaService.$transaction([
      this.prismaService.user.create({
        data: {
          id: userId,
          email: tokenInfo.email,
          name: tokenInfo.name,
          profileImageUrl: tokenInfo.picture,
        },
      }),
      this.prismaService.account.create({
        data: {
          id: id,
          type: $Enums.AccountType.GOOGLE,
          userId: userId,
        },
      }),
    ]);

    return user;
  }

  private async createToken(userId: string): Promise<string> {
    const token = this.generateToken();

    await this.prismaService.token.upsert({
      create: { userId: userId, token: token },
      update: { userId: userId, token: token },
      where: { userId: userId },
    });

    return token;
  }

  private generateToken(): string {
    return randomBytes(32).toString('hex');
  }

  private generateUserId(): string {
    return uuidv4();
  }
}

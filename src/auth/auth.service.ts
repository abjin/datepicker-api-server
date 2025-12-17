import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { GoogleTokenPayload } from '@types';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  public async getGoogleTokenInfo(
    idToken: string,
  ): Promise<GoogleTokenPayload> {
    const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`;
    const response =
      await this.httpService.axiosRef.get<GoogleTokenPayload>(url);
    return response.data;
  }
}

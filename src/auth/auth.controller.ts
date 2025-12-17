import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GoogleLoginDto } from './dtos/google-login.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google/login')
  @ApiOperation({ summary: 'Google 로그인' })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async googleLogin(@Body() googleLoginDto: GoogleLoginDto) {
    const result = await this.authService.getGoogleTokenInfo(
      googleLoginDto.idToken,
    );

    return { idToken: googleLoginDto.idToken, result };
  }
}

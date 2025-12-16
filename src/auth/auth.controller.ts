import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GoogleLoginDto } from './dto/google-login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Post('google/login')
  @ApiOperation({ summary: 'Google 로그인' })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  googleLogin(@Body() googleLoginDto: GoogleLoginDto) {
    console.log({ idToken: googleLoginDto.idToken });

    return {
      message: 'Google login endpoint',
      idToken: googleLoginDto.idToken,
    };
  }
}

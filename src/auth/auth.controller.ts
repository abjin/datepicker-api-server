import { Controller, Post, Body } from '@nestjs/common';
import { GoogleLoginDto } from './dto/google-login.dto';

@Controller('auth')
export class AuthController {
  @Post('google/login')
  googleLogin(@Body() googleLoginDto: GoogleLoginDto) {
    console.log({ idToken: googleLoginDto.idToken });

    return {
      message: 'Google login endpoint',
      idToken: googleLoginDto.idToken,
    };
  }
}

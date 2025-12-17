import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GoogleLoginDto {
  @ApiProperty({
    description: 'Google ID 토큰',
    example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjFkYzBmMTc...',
  })
  @IsNotEmpty()
  @IsString()
  idToken: string;
}

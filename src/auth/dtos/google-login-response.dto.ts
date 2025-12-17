import { ApiProperty } from '@nestjs/swagger';

class UserDto {
  @ApiProperty({ description: '사용자 ID' })
  id: string;

  @ApiProperty({ description: '이메일', nullable: true })
  email: string | null;

  @ApiProperty({ description: '이름', nullable: true })
  name: string | null;

  @ApiProperty({ description: '프로필 이미지 URL', nullable: true })
  profileImageUrl: string | null;

  @ApiProperty({ description: '생성일' })
  createdAt: Date;

  @ApiProperty({ description: '지역', nullable: true })
  region: string | null;

  @ApiProperty({ description: '관심사', type: [String] })
  interests: string[];

  @ApiProperty({ description: '예산', nullable: true })
  budget: number | null;
}

export class GoogleLoginResponseDto {
  @ApiProperty({ description: '인증 토큰' })
  token: string;

  @ApiProperty({ description: '사용자 정보', type: UserDto })
  user: UserDto;

  constructor(partial: Partial<GoogleLoginResponseDto>) {
    Object.assign(this, partial);
  }
}

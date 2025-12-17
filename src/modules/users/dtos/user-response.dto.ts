import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ description: '사용자 ID' })
  id: string;

  @ApiProperty({ description: '생성일시' })
  createdAt: Date;

  @ApiProperty({ description: '이메일', nullable: true })
  email: string | null;

  @ApiProperty({ description: '이름', nullable: true })
  name: string | null;

  @ApiProperty({ description: '프로필 이미지 URL', nullable: true })
  profileImageUrl: string | null;

  @ApiProperty({ description: '지역', nullable: true })
  region: string | null;

  @ApiProperty({ description: '관심사 목록', type: [String] })
  interests: string[];

  @ApiProperty({ description: '예산', nullable: true })
  budget: number | null;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}

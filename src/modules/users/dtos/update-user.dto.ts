import { IsOptional, IsString, IsArray, IsInt, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: '이메일' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ description: '이름' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: '프로필 이미지 URL' })
  @IsOptional()
  @IsString()
  profileImageUrl?: string;

  @ApiPropertyOptional({ description: '지역' })
  @IsOptional()
  @IsString()
  region?: string;

  @ApiPropertyOptional({ description: '관심사 목록', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];

  @ApiPropertyOptional({ description: '예산', minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  budget?: number;
}

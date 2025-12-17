import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDateCourseDto {
  @ApiProperty({ description: '지역', example: '서울 강남' })
  @IsString()
  @IsNotEmpty()
  region: string;

  @ApiProperty({ description: '예산', example: '10만원' })
  @IsString()
  @IsNotEmpty()
  budget: string;

  @ApiProperty({ description: '관심사', example: '맛집, 카페, 전시회' })
  @IsString()
  @IsNotEmpty()
  interests: string;
}

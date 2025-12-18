import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateDateCourseDto {
  @ApiProperty({ description: '지역', example: '서울 강남' })
  @IsString()
  @IsNotEmpty()
  region: string;

  @ApiProperty({ description: '예산', example: 5 })
  @IsNumber()
  @IsNotEmpty()
  budget: number;

  @ApiProperty({ description: '관심사', example: ['맛집', '카페', '전시회'] })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  @Transform(({ value }) => value.join(', '))
  interests: string;
}

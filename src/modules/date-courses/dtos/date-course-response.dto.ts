import { ApiProperty } from '@nestjs/swagger';

export class PlaceDto {
  @ApiProperty({ description: '장소명' })
  place: string;

  @ApiProperty({ description: '장소 설명' })
  description: string;

  @ApiProperty({ description: '관련 링크' })
  link: string;
}

export class DateCourseResponseDto {
  @ApiProperty({ description: '코스 제목' })
  title: string;

  @ApiProperty({ description: '코스 설명' })
  courseDescription: string;

  @ApiProperty({ description: '추천 장소 목록', type: [PlaceDto] })
  course: PlaceDto[];
}

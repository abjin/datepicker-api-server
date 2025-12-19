import { ApiProperty } from '@nestjs/swagger';

class PlaceDto {
  @ApiProperty({ description: '장소 ID' })
  id: number;

  @ApiProperty({ description: '순서' })
  order: number;

  @ApiProperty({ description: '장소명' })
  place: string;

  @ApiProperty({ description: '장소 설명' })
  description: string;

  @ApiProperty({ description: '관련 링크', nullable: true })
  link: string | null;

  @ApiProperty({ description: '코스 ID' })
  courseId: number;
}

export class CourseListItemDto {
  @ApiProperty({ description: '코스 ID' })
  id: number;

  @ApiProperty({ description: '생성일' })
  createdAt: Date;

  @ApiProperty({ description: '코스 제목' })
  title: string;

  @ApiProperty({ description: '코스 설명' })
  courseDescription: string;

  @ApiProperty({ description: '예산 (만원)', nullable: true })
  budget: number | null;

  @ApiProperty({ description: '지역', nullable: true })
  region: string | null;

  @ApiProperty({ description: '조회수' })
  viewCount: number;

  @ApiProperty({ description: '장소 목록', type: [PlaceDto] })
  places: PlaceDto[];
}

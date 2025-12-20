import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';

export enum SortBy {
  LATEST = 'latest',
  VIEWS = 'views',
}

export class GetDateCoursesQueryDto {
  @ApiPropertyOptional({
    enum: SortBy,
    description: '정렬 기준 (latest: 최신순, views: 조회수순)',
    default: SortBy.LATEST,
  })
  @IsOptional()
  @IsEnum(SortBy)
  sortBy?: SortBy = SortBy.LATEST;

  @ApiPropertyOptional({
    description: '조회할 데이트 코스 개수',
    default: 30,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 30;
}

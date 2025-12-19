import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

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
}

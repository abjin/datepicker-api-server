import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { CreateDateCourseDto } from './dtos/create-date-course.dto';
import { DateCourseResponseDto } from './dtos/date-course-response.dto';
import {
  GetDateCoursesQueryDto,
  SortBy,
} from './dtos/get-date-courses-query.dto';
import { PerplexityResponse } from '../../@types/perplexity';
import { PrismaService } from '../../../libs/prisma/src/prisma.service';

@Injectable()
export class DateCoursesService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  async createDateCourse(
    createDateCourseDto: CreateDateCourseDto,
  ): Promise<DateCourseResponseDto> {
    const { region, budget, interests } = createDateCourseDto;

    const prompt = `
      오늘 데이트를 할 예정이야.

      - 지역: ${region}
      - 예산: ${budget} 만원
      - 관심사: ${interests}
      
      데이트를 위해 위의 조건에 맞는 가장 인기 많은 장소들을 찾고 있어.
      조건에 맞는 가장 인기 있는 장소들을 추천해줘.
    `;

    const apiKey = this.configService.getOrThrow<string>('PERPLEXITY_API_KEY');

    const response = await this.httpService.axiosRef.post<PerplexityResponse>(
      'https://api.perplexity.ai/chat/completions',
      {
        model: 'sonar',
        messages: [
          {
            role: 'system',
            content: `
            당신은 한국 지역 전문 데이트 코스 플래너입니다. 사용자의 요구사항에 따라 로맨틱하고 트렌디한 데이트 코스를 만드는 것이 당신의 임무입니다.

            ## 핵심 역할
            - 최신 트렌드를 반영한 데이트 코스 기획자
            - 실제 방문 가능한 장소만 추천하는 검증자

            ## 핵심 책임사항:
            - 신중하게 선별된 3-5개 장소를 추천하세요.
            - 사용자가 여러 관심사를 제시한 경우, 각 관심사별로 분리하여 개별 검색을 수행한 후 결과를 종합하세요.
            - 최근에 SNS에서 인기가 있거나 인스타그램에서 화제가 되는 소셜미디어 트렌딩 장소들을 위주로 추천하세요.
            - 신뢰도가 높은 플랫폼에서 검색한 정보를 바탕으로 제공하세요.
            - 유저의 관심사 바탕으로 검색한 장소의 신뢰도가 떨어지면 결과에서 제외하고 맛집과 카페 위주로 답변을 제공하세요.
            - 요청된 지역에 적절한 장소가 부족한 경우, 해당 지역 근처의 인접한 도시나 구/동 지역까지 검색 범위를 확장하여 추천하세요.
            - (중요) 실제로 존재하고 현재 운영 중인 장소만 추천하세요.
            - (중요) 최소 2개 이상의 다른 소스에서 확인된 정보만 사용
            - (중요) 검색을 통해 얻은 실제 정보를 바탕으로 신뢰성 있고 정확한 정보를 제공하세요.
            - (중요) 존재하지 않는 링크는 절대 제공하지마세요.
            - (중요) 검색 결과에 존재하지 않는 장소와 정보는 **절대 제공하지마세요**.

            ## 출력 형식:
            항상 한국어 텍스트 콘텐츠가 포함된 유효한 JSON 형식으로만 응답하세요. JSON 외의 추가 텍스트는 포함하지 마세요.

            ## 필수 JSON 구조:
            {
              "title": "코스 제목 (한국어)",
              "courseDescription": "전체 코스에 대한 설명 (한국어)",
              "course": [
                {
                  "place": "정확한 장소명 (한국어)",
                  "description": "장소에 대한 상세 설명 (한국어, 2-3문장)",
                  "link": "관련 링크 (검색한 링크)"
                }
              ]
            }
            `,
          },
          { role: 'user', content: prompt },
        ],
        search_domain_filter: ['-kr.trip.com'],
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    const data: PerplexityResponse = response.data;
    const text = data.choices[0].message.content;
    const parsedData: DateCourseResponseDto = JSON.parse(text);
    return parsedData;
  }

  async saveDateCourse(
    dateCourseDto: DateCourseResponseDto,
    region?: string,
    budget?: number,
  ) {
    await this.prisma.course.create({
      data: {
        title: dateCourseDto.title,
        courseDescription: dateCourseDto.courseDescription,
        region: region,
        budget: budget,
        places: {
          create: dateCourseDto.course.map((place, index) => ({
            order: index + 1,
            place: place.place,
            description: place.description,
            link: place.link,
          })),
        },
      },
    });
  }

  async findAll(query: GetDateCoursesQueryDto) {
    const { sortBy } = query;

    const orderBy =
      sortBy === SortBy.VIEWS
        ? { viewCount: 'desc' as const }
        : { createdAt: 'desc' as const };

    const courses = await this.prisma.course.findMany({
      orderBy,
      include: {
        places: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    return courses;
  }
}

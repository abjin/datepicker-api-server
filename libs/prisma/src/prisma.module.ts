import { DynamicModule, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';

export interface PrismaModuleOptions {
  isGlobal?: boolean;
}

@Module({})
export class PrismaModule {
  static forRoot(options: PrismaModuleOptions = {}): DynamicModule {
    return {
      module: PrismaModule,
      global: options.isGlobal ?? false,
      imports: [ConfigModule.forRoot()],
      providers: [PrismaService],
      exports: [PrismaService],
    };
  }
}

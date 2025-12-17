import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getMemoryStatus() {
    const memoryUsage = process.memoryUsage();
    const formatMemory = (bytes: number) =>
      parseFloat((bytes / 1024 / 1024).toFixed(2));

    return {
      rss: {
        value: formatMemory(memoryUsage.rss),
        unit: 'MB',
        description: 'Total memory allocated',
      },
      heapTotal: {
        value: formatMemory(memoryUsage.heapTotal),
        unit: 'MB',
        description: 'Heap allocated',
      },
      heapUsed: {
        value: formatMemory(memoryUsage.heapUsed),
        unit: 'MB',
        description: 'Heap used',
      },
      external: {
        value: formatMemory(memoryUsage.external),
        unit: 'MB',
        description: 'C++ objects memory',
      },
      arrayBuffers: {
        value: formatMemory(memoryUsage.arrayBuffers),
        unit: 'MB',
        description: 'Array Buffers memory',
      },
    };
  }
}

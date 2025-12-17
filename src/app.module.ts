import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [{ ...HttpModule.register({}), global: true }, AuthModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [HttpModule],
})
export class AppModule {}

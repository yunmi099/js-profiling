import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getRoot(): string {
    return this.appService.getHello();
  }

  // CPU 부하를 만들어 프로파일링에 사용
  @Get('/work')
  doWork(): string {
    let s = 0;
    for (let i = 0; i < 5_000_000; i++) {
      s += i % 3;
    }
    return `work:${s}`;
  }
}


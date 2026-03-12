import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initDefaultMetrics } from './metrics';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  const port = parseInt(process.env.PORT || '3000', 10);
  initDefaultMetrics();
  await app.listen(port, '127.0.0.1');
  // 간단한 프로파일링 시작 로그
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://127.0.0.1:${port}`);
}

bootstrap();

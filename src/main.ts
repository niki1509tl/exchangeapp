import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './api/framework/validationPipeline';
import { GlobalExceptionFilter } from './api/framework/error-handling/error.handle';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new GlobalExceptionFilter())

  await app.listen(3000);
}
bootstrap();

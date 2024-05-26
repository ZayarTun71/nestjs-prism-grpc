import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => {
      const formattedErrors = errors.map(error => ({
        property: error.property,
        constraints: error.constraints,
      }));
      return new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Validation failed',
        errors: formattedErrors,
      }, HttpStatus.BAD_REQUEST);
    },
  }));

  await app.listen(3000);
}
bootstrap();

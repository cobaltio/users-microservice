import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('API-GATEWAY');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin@localhost:5672'],
        queue: 'users_microservice_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  app.listen();
}
bootstrap();

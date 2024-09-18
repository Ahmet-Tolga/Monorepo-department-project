import { NestFactory } from '@nestjs/core';
import { OfficeModule } from './office.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const configService=new ConfigService();

  const username=configService.get("RABBITMQ_DEFAULT_USER");
  const password=configService.get("RABBITMQ_DEFAULT_PASS");

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(OfficeModule,{
    transport:Transport.RMQ,
    options:{
      urls:[`amqp://${username}:${password}@localhost:5672`],
      queue:"OFFICE_QUEUE",
    },
  })
  app.useGlobalPipes(new ValidationPipe());

  await app.listen();
  console.log("Office Microservice is running!");
}
bootstrap();

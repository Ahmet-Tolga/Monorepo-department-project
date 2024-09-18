import { Inject, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OfficeModule } from 'apps/office/src/office.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({isGlobal:true,
      ttl:30*1000,
      store:redisStore
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => config(configService),
    }),
    OfficeModule,
    ClientsModule.register([
      {name:"OFFICE_SERVICE",transport:Transport.RMQ,options:{urls:["amqp://username123:password123@localhost:5672"],queue:"OFFICE_QUEUE"}},
      {name:"EMPLOYEE_SERVICE",transport:Transport.RMQ,options:{urls:["amqp://username123:password123@localhost:5672"],queue:"EMPLOYEE_QUEUE"}},
      {name:"EXAM_SERVICE",transport:Transport.RMQ,options:{urls:["amqp://username123:password123@localhost:5672"],queue:"EXAM_QUEUE"}}
    ])
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule{
}

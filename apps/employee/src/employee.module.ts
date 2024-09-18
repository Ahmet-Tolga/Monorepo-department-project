import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmployeeDatabase } from 'libs/shared/database/Employee.database';
import { Employee } from './Entity/Employee.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => config(configService),
    }),
    TypeOrmModule.forFeature([Employee])
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService,EmployeeDatabase],
})
export class EmployeeModule {}

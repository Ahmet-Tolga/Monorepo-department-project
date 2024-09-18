import { Module } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ExamDatabase } from 'libs/shared/database/Exam.database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './Entity/exam.entity';
import config from 'ormconfig';
import { EmployeeDatabase } from 'libs/shared/database/Employee.database';
import { Employee } from 'apps/employee/src/Entity/Employee.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => config(configService),
    }),
    TypeOrmModule.forFeature([Exam,Employee]),
  ],
  controllers: [ExamController],
  providers: [ExamService,ExamDatabase,EmployeeDatabase],
})
export class ExamModule {}

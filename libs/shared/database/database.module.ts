import { Module } from '@nestjs/common';
import { EmployeeDatabase } from './Employee.database';
import { OfficeDatabase } from './Office.database';
import { ExamDatabase } from './Exam.database';

@Module({
  providers: [
    EmployeeDatabase,
    OfficeDatabase,
    ExamDatabase
  ]
})
export class DatabaseModule {}

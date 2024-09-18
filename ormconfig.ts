import { ConfigService } from '@nestjs/config';
import { Employee } from 'apps/employee/src/Entity/Employee.entity';
import { Exam } from 'apps/exam/src/Entity/exam.entity';
import { Office } from 'apps/office/src/Entity/office.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config = (configService: ConfigService): PostgresConnectionOptions => ({
  type: 'postgres',
  host: configService.get<string>('POSTGRES_HOST', 'localhost'),
  port: configService.get<number>('POSTGRES_PORT', 5432),
  username: configService.get<string>('POSTGRES_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  database: configService.get<string>('POSTGRES_DB'),
  entities: [Office,Employee,Exam],  // entities dizini
  synchronize: true,
});

export default config;
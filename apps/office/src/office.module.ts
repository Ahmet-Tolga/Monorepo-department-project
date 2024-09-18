import { Module } from '@nestjs/common';
import { OfficeController } from './office.controller';
import { OfficeService } from './office.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Office } from './Entity/office.entity';
import config from 'ormconfig';
import { OfficeDatabase } from 'libs/shared/database/Office.database';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => config(configService),
    }),
    TypeOrmModule.forFeature([Office]),
  ],
  controllers: [OfficeController],
  providers: [
    OfficeService,
    OfficeDatabase,
  ]
})
export class OfficeModule {}

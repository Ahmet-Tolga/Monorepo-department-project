import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Office } from './Entity/office.entity';
import { OfficeDatabase } from 'libs/shared/database/Office.database';
import { CreateOfficeDto } from './Dto/CreateOfficeDto.dto';
import { UpdateOfficeDto } from './Dto/UpdateOfficeDto.dto';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class OfficeService {
     constructor(private readonly officeRepository:OfficeDatabase){};

     async create(data:CreateOfficeDto){
        return await this.officeRepository.create(data);
     }

     async findOneBy(id:string){
        return await this.officeRepository.findOneBy({id});
     }

     async findAll(){
        return await this.officeRepository.findAll();
     }

     async remove(id:string){
        return await this.officeRepository.remove(id);
     }

     async update(id:string,data:UpdateOfficeDto){
        return await this.officeRepository.update(id,data);
     }

     async paginate(options:IPaginationOptions){
      const queryBuilder=await this.officeRepository.queryBuilder("exam");
  
      queryBuilder.orderBy("exam.id","ASC");
  
      return paginate(queryBuilder,options);
    }
}

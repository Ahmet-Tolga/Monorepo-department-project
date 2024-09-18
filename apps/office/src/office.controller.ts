import { Controller, Get } from '@nestjs/common';
import { OfficeService } from './office.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOfficeDto } from './Dto/CreateOfficeDto.dto';
import { UpdateInformationInterface } from 'libs/shared/interfaces/updateInformation.interface';
import { UpdateOfficeDto } from './Dto/UpdateOfficeDto.dto';
import { PaginationInterface } from 'libs/shared/interfaces/pagination.interface';

@Controller()
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @MessagePattern("test")
  async test(){
    return await "this is the test";
  }
  
  @MessagePattern("create-office")
  async createOffice(@Payload() createOfficeDto:CreateOfficeDto){
    return await this.officeService.create(createOfficeDto);
  }

  @MessagePattern("findOne-office")
  async findOneById(@Payload() id:string){
    return await this.officeService.findOneBy(id);
  }

  @MessagePattern("findall-office")
  async findAllOffices(options:PaginationInterface){
    return await this.officeService.paginate(options);
  }

  @MessagePattern("remove-office")
  async removeOffice(@Payload() id:string){
    return await this.officeService.remove(id);
  }

  @MessagePattern("update-office")
  async updateOffice(@Payload() updateOfficeData:UpdateInformationInterface<UpdateOfficeDto>){
    const {id,data}=updateOfficeData;
    return await this.officeService.update(id,data);
  }
}

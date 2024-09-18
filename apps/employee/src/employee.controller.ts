import { Controller } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateEmployeeDto } from './Dto/CreateEmployeeDto.dto';
import { UpdateInformationInterface } from 'libs/shared/interfaces/updateInformation.interface';
import { UpdateEmployeeDto } from './Dto/UpdateEmployeeDto.dto';
import { PaginationInterface } from 'libs/shared/interfaces/pagination.interface';

@Controller()
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @MessagePattern("create-employee")
  async create(@Payload() data:CreateEmployeeDto){
    return await this.employeeService.createEmployee(data);
  }

  @MessagePattern("findOne-employee")
  async findOneBy(@Payload() id:string){
    return await this.employeeService.findOneBy(id);
  }

  @MessagePattern("findall-employee")
  async findAll(@Payload() options:PaginationInterface){
    return await this.employeeService.paginate(options);
  }

  @MessagePattern("delete-employee")
  async delete(@Payload() id:string){
    return await this.employeeService.delete(id);
  }

  @MessagePattern("update-employee")
  async update(@Payload() updateInformationData:UpdateInformationInterface<UpdateEmployeeDto>){
    const {id,data}=updateInformationData;
    return await this.employeeService.update(id,data);
  }
}

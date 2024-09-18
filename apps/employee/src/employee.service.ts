import { Injectable } from '@nestjs/common';
import { EmployeeDatabase } from 'libs/shared/database/Employee.database';
import { CreateEmployeeDto } from './Dto/CreateEmployeeDto.dto';
import { UpdateEmployeeDto } from './Dto/UpdateEmployeeDto.dto';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository:EmployeeDatabase){};

  async createEmployee(createEmployeeDto:CreateEmployeeDto){
    return await this.employeeRepository.create(createEmployeeDto);
  }

  async findOneBy(id:string){
    return await this.employeeRepository.findOneBy({id});
  }

  async findAll(){
    return await this.employeeRepository.findAll();
  }

  async delete(id:string){
    return await this.employeeRepository.remove(id);
  }

  async update(id:string,data:UpdateEmployeeDto){
    return await this.employeeRepository.update(id,data);
  }

  async paginate(options:IPaginationOptions){
    const queryBuilder=await this.employeeRepository.queryBuilder("employee");

    queryBuilder.orderBy("employee.id","ASC");

    return paginate(queryBuilder,options);
  }
}

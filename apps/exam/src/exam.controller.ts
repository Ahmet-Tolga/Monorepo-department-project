import { Body, Controller, Get, Param } from '@nestjs/common';
import { ExamService } from './exam.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateExamDto } from './Dto/createExamDto.dto';
import { UpdateInformationInterface } from 'libs/shared/interfaces/updateInformation.interface';
import { UpdateExamDto } from './Dto/updateExamDto.dto';
import { PaginationInterface } from 'libs/shared/interfaces/pagination.interface';

@Controller()
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @MessagePattern("create-exam")
  async create(@Payload() createExamDto:CreateExamDto){
    return await this.examService.create(createExamDto);
  }

  @MessagePattern("findOne-exam")
  async findOneBy(@Payload() id:string){
    return await this.examService.findOneBy(id);
  }

  @MessagePattern("findall-exam")
  async findAll(@Payload() options:PaginationInterface){
    return await this.examService.paginate(options);
  }

  @MessagePattern("delete-exam")
  async delete(@Payload() id:string){
    return await this.examService.delete(id);
  }

  @MessagePattern("update-exam")
  async update(@Payload() updateData:UpdateInformationInterface<UpdateExamDto>){
    const {id,data}=updateData;
    return await this.examService.update(id,data);
  }

  @MessagePattern("add-employee-exam")
  async addEmployee(@Payload() data:any){
    const {exam_id,employee_id}=data;
    return await this.examService.addEmployee(exam_id,employee_id);
  }

  @MessagePattern("remove-employee-exam")
  async removeEmployee(@Payload() data:any){
    const {exam_id,employee_id}=data;
    return await this.examService.removeEmployee(exam_id,employee_id);
  }
}

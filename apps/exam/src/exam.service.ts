import { Injectable } from '@nestjs/common';
import { ExamDatabase } from 'libs/shared/database/Exam.database';
import { CreateExamDto } from './Dto/createExamDto.dto';
import { UpdateExamDto } from './Dto/updateExamDto.dto';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class ExamService {
  constructor(private readonly examDatabase:ExamDatabase){};

  async create(data:CreateExamDto){
    return await this.examDatabase.create(data);
  }

  async findOneBy(id:string){
    return await this.examDatabase.findOneBy({id},["employees"]);
  }

  async findAll(){
    return await this.examDatabase.findAll();
  }

  async delete(id: string) {
    const exam = await this.examDatabase.findOneBy({ id }, ['employees']);
    
    if (exam) {
        exam.employees = [];
        await this.examDatabase.create(exam);
        
        return await this.examDatabase.remove(id);
    }
    
    return { success: false, message: "Exam not found!" };
}

  async update(id:string,data:UpdateExamDto){
    return await this.examDatabase.update(id,data);
  }

  async addEmployee(exam_id:string,employee_id:string){
    return await this.examDatabase.addEmployee(exam_id,employee_id);
  }

  async removeEmployee(exam_id:string,employee_id:string){
    return await this.examDatabase.removeEmployee(exam_id,employee_id);
  }

  async paginate(options:IPaginationOptions){
    const queryBuilder=await this.examDatabase.queryBuilder("exam");

    queryBuilder.orderBy("exam.id","ASC");

    return paginate(queryBuilder,options);
  }
}

import { Exam } from "apps/exam/src/Entity/exam.entity";
import { BaseAbstractRepository } from "../repository/base.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EmployeeDatabase } from "./Employee.database";

@Injectable()
export class ExamDatabase extends BaseAbstractRepository<Exam> {
    constructor(
        @InjectRepository(Exam) private readonly examRepository: Repository<Exam>,
        private readonly employeeDatabase: EmployeeDatabase
    ) {
        super(examRepository);
    }

    async addEmployee(exam_id: string, id: string) {
        const exam = await this.findOneBy({ id: exam_id }, ['employees']);
        const employee = await this.employeeDatabase.findOneBy({ id });

        try{
            exam.employees.push(employee);
            return await this.examRepository.save(exam);
        }

        catch(err){
            return {success:false,message:"an error accured when adding a employee!"};
        }

    }

    async removeEmployee(exam_id: string, id: string) {
        const exam = await this.findOneBy({ id: exam_id }, ['employees']); 
        const employee = await this.employeeDatabase.findOneBy({ id });

        try{
            exam.employees=exam.employees.filter((student)=>{student.id!==employee.id});
            return await this.examRepository.save(exam);
        }

        catch(err){
            return {success:false,message:"an error accured when adding a employee!"};
        }
    }
}

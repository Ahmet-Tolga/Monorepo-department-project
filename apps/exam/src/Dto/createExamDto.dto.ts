import { Employee } from "apps/employee/src/Entity/Employee.entity";
import { IsDateString, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateExamDto{
    @IsString()
    @IsNotEmpty()
    lesson_name:string;

    @IsDateString()
    exam_date:string;

    @IsNumber()
    @IsPositive()
    duration:number;
}
import { IsNotEmpty, IsNumber, IsString, IsUUID, MinLength } from "class-validator";

export class CreateEmployeeDto{
    @IsString()
    @IsNotEmpty()
    employee_name:string;

    @IsString()
    @MinLength(20)
    description:string;

    @IsNumber()
    salary:number;

    @IsString()
    @IsUUID()
    office_id:string;
}
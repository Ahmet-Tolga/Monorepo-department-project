import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateOfficeDto{
    @IsString()
    @IsNotEmpty()
    office_name:string;

    @IsNumber()
    @IsPositive()
    capacity:number;

    @IsString()
    location:string;
}
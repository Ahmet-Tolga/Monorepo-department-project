import { PartialType } from "@nestjs/mapped-types";
import { CreateEmployeeDto } from "./CreateEmployeeDto.dto";

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto){
    
}
import { PartialType } from "@nestjs/mapped-types";
import { CreateOfficeDto } from "./CreateOfficeDto.dto";

export class UpdateOfficeDto extends PartialType(CreateOfficeDto){
    
}
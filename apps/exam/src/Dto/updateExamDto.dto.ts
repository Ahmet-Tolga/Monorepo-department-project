import { PartialType } from "@nestjs/mapped-types";
import { CreateExamDto } from "./createExamDto.dto";

export class UpdateExamDto extends PartialType(CreateExamDto){};
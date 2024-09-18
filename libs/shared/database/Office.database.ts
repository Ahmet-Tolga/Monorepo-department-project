import { Office } from "apps/office/src/Entity/office.entity";
import { BaseAbstractRepository } from "../repository/base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class OfficeDatabase extends BaseAbstractRepository<Office>{
    constructor(@InjectRepository(Office) private readonly officeRepository:Repository<Office>){
        super(officeRepository);
    }
}
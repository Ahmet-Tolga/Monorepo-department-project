import { BaseAbstractRepository } from "../repository/base.repository";
import {Employee} from "../../../apps/employee/src/Entity/Employee.entity"
import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class EmployeeDatabase extends BaseAbstractRepository<Employee>{
    constructor(@InjectRepository(Employee) private readonly employeeRepository:Repository<Employee>){
        super(employeeRepository);
    }
}
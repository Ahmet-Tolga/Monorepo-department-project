import { Office } from "apps/office/src/Entity/office.entity";
import {PrimaryGeneratedColumn,Column,ManyToOne, Entity, ManyToMany, JoinTable, JoinColumn} from "typeorm";
import {Exam} from "../../../exam/src/Entity/exam.entity";

@Entity({name:"employee"})
export class Employee{
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column({name:"employee_name"})
    employee_name:string;

    @Column({name:"description"})
    description:string;

    @Column({name:"salary",type:"int"})
    salary:number;

    @Column({name:"office_id"})
    office_id:string;

    @ManyToMany(()=>Exam,exam=>exam.employees,{onDelete:"SET NULL"})
    @JoinTable()
    exams:Exam[];

    @ManyToOne(()=>Office,office=>office.employees,{onDelete:"CASCADE"})
    @JoinColumn({name:"office_id"})
    office:Office;
}
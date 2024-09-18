import {Entity,PrimaryGeneratedColumn,Column, ManyToMany} from "typeorm";
import {Employee} from "../../../employee/src/Entity/Employee.entity";

@Entity({name:"exam"})
export class Exam{
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column({name:"lesson_name"})
    lesson_name:string;

    @Column({name:"exam_date",type:"varchar"})
    exam_date:string;

    @Column({name:"duration"})
    duration:number;

    @ManyToMany(()=>Employee,employee=>employee.exams)
    employees:Employee[];
}
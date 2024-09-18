import { Employee } from "apps/employee/src/Entity/Employee.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"office"})
export class Office{
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    office_name:string;

    @Column()
    capacity:number;

    @Column({name:"location",type:"varchar"})
    location:string;

    @OneToMany(()=>Employee,employee=>employee.office,{onDelete:"SET NULL"})
    employees:Employee[];

    @CreateDateColumn()
    created_at:string;
}
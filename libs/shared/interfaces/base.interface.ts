import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere } from "typeorm";

export interface BaseInterfaceRepository<T>{
    create(data:DeepPartial<T>):Promise<T>;
    findAll(options?:FindManyOptions<T>,relations?:string[]):Promise<T[]>;
    findOneBy(filterCondition:FindOptionsWhere<T>,relations?:string[]):any;
    remove(id:string):any;
    update(id:string,data:any):any;
    findWithRelations(relations:FindManyOptions<T>):Promise<T[]>;
    queryBuilder(query:string):any;
}
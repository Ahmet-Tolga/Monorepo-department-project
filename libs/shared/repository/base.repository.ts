import { DeepPartial, Repository, ObjectLiteral, FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { BaseInterfaceRepository } from '../interfaces/base.interface';

interface HasId{
    id:string;
}

export abstract class BaseAbstractRepository<T extends HasId> implements BaseInterfaceRepository<T>{
    protected entity: Repository<T>;

    protected constructor(repository: Repository<T>) {
        this.entity = repository;
    }

    async create(data: DeepPartial<T>): Promise<T> {
        return await this.entity.save(data);
    }

    async findAll(options?: FindManyOptions<T> | undefined): Promise<T[]> {
        return await this.entity.find(options);
    }

    async findOneBy(filterCondition: FindOptionsWhere<T>,relations?:string[]){
        return await this.entity.findOne({where:filterCondition,relations});
    }

    async findWithRelations(relations: FindManyOptions<T>): Promise<T[]> {
        return await this.entity.find(relations);
    }

    async remove(id:string){
        return await this.entity.delete(id);
    }

    async update(id: string, data: any) {
        return await this.entity.update(id,data);
    }

    async queryBuilder(query:string){
        return await this.entity.createQueryBuilder(query);
    }
}

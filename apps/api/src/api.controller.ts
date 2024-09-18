import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOfficeDto } from 'apps/office/src/Dto/CreateOfficeDto.dto';
import { UpdateEmployeeDto } from 'apps/employee/src/Dto/UpdateEmployeeDto.dto';
import { CreateExamDto } from 'apps/exam/src/Dto/createExamDto.dto';
import { UpdateExamDto } from 'apps/exam/src/Dto/updateExamDto.dto';
import { UpdateOfficeDto } from 'apps/office/src/Dto/UpdateOfficeDto.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@CacheTTL(30*1000)
@Controller()
export class ApiController {
  constructor(
  @Inject("OFFICE_SERVICE") private readonly officeService:ClientProxy,
  @Inject("EMPLOYEE_SERVICE") private readonly employeeService:ClientProxy,
  @Inject("EXAM_SERVICE") private readonly examService:ClientProxy
) {}

  //Requests for office 

  @Get("/test")
  async test(){
    return await this.officeService.send("test",{});
  }

  @Post("/office/create")
  async createOffice(@Body() data:CreateOfficeDto){
    return await this.officeService.send("create-office",data).toPromise();
  }
  
  @Get("/office/findOneById/:param")
  async findOneOfficeBy(@Param("param") param:any){
    return await this.officeService.send("findOne-office",param).toPromise();
  }

  @Get("/office/findAll")
  async findAllOffices(
    @Query("page") page:number=1,
    @Query("limit") limit:number=1
  ){
    return await this.officeService.send("findall-office",{page,limit}).toPromise();
  }

  @Delete("/office/delete/:id")
  async deleteOffice(@Param("id") id:string){
    return await this.officeService.send("remove-office",id).toPromise();
  }

  @Put("/office/update/:id")
  async updateOffice(@Param("id") id:string,@Body() data:UpdateOfficeDto){
    return await this.officeService.send("update-office",{id,data}).toPromise();
  }

  //Requests for employee

  @Post("/employee/create")
  async createEmploye(@Body() data){
    return await this.employeeService.send("create-employee",data).toPromise();
  }

  @Get("/employee/findOne/:param")
  async findOneEmployeeBy(@Param("param") param:any){
    return await this.employeeService.send("findOne-employee",param).toPromise();
  }

  @Get("/employee/findall")
  async findAllEmployees(
    @Query("page") page:number=1,
    @Query("limit") limit:number=1
  ){
    return await this.employeeService.send("findall-employee",{page,limit}).toPromise();
  }

  @Delete("/employee/delete/:id")
  async deleteEmployee(@Param() id:string){
    return await this.employeeService.send("delete-employee",id).toPromise();
  }

  @Put("/employee/update/:id")
  async updateEmployee(@Param("id") id:string,@Body() data:UpdateEmployeeDto){
    return await this.employeeService.send("update-employee",{id,data}).toPromise();
  }

  //Requests for exam

  @Post("/exam/create")
  async createExam(@Body() createExamDto:CreateExamDto){
    return await this.examService.send("create-exam",createExamDto).toPromise();
  }

  @Get("/exam/findOneBy/:param")
  async findOneExam(@Param("param") param:any){
    return await this.examService.send("findOne-exam",param).toPromise();
  }

  @Get("/exam/findAll")
  async findAllExams(
    @Query("page") page:number=1,
    @Query("limit") limit:number=1
  ){
    return await this.examService.send("findall-exam",{page,limit}).toPromise();
  }

  @Delete("/exam/delete/:id")
  async deleteExam(@Param("id") id:string){
    return await this.examService.send("delete-exam",id).toPromise();
  }

  @Put("/exam/update/:id")
  async updateExam(@Param("id") id:string,@Body() data:UpdateExamDto){
    return await this.examService.send("update-exam",{id,data}).toPromise();
  }

  @Post("/exam/addEmployee")
  async addEmployeeToExam(@Body("exam_id") exam_id:string,@Body("employee_id") employee_id:string){
    return await this.examService.send("add-employee-exam",{exam_id,employee_id}).toPromise();
  }

  @Post("/exam/removeEmployee")
  async removeEmployeeFromExam(@Body("exam_id") exam_id:string,@Body("employee_id") employee_id:string){
    return await this.examService.send("remove-employee-exam",{exam_id,employee_id}).toPromise();
  }
}

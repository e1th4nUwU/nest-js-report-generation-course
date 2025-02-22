import { Controller, Get } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  async hello() {
    return await this.basicReportsService.hello();
   } 

   // Funcion para obtener los datos del primer empleado
    @Get('firstEmployee')
    async firstEmployee(){
        return await this.basicReportsService.firstEmployee();
    }
}

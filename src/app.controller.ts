import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('nuevo')
  newEndPoint(){
    return 'yo soy nuevo';
  }

  @Get('/ruta/')
  newApi(){
    return 'Una api nueva';
  }

  @Get('tasks')
  tasks() {
    return this.appService.getTasks();
  }
}

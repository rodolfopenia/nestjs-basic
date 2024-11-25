import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from 'config';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey:string,
    @Inject('TASKS') private tasks: any[],
    //private configService: ConfigService
    @Inject(config.KEY) private configService:ConfigType<typeof config>,
  ){}
  getHello(): string {
    //console.log(this.tasks);
    //const db = this.configService.get('DATABASE_NAME');
    const db = this.configService.database.name;
    return `Hola mundo! ${db}`;
  }
}

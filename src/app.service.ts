import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from 'config';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey:string,
    @Inject('PG') private clientPg:Client,
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

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });

  }
}

import { Module, Global } from '@nestjs/common';

const API_KEY='12345632';
const API_KEY_PRD = 'prod1212121';

@Global()
@Module({
  providers:[
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PRD : API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}

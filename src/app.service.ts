import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Fuck You Min!!!';
  }
  getName(): string {
    return 'Rungaroon Sanguanrit';
  }
  getJson() {
    return {
      name: 'Rungaroon',
      lastname: 'Sanguanrit',
      age: 19,
    };
  }
  getJson2() {
    return {
      name: 'Rungaroon2',
      lastname: 'Sanguanrit2',
      age: 192,
    };
  }
  getJson3() {
    return{
      name:'Rungaroon'
    }
  }
}

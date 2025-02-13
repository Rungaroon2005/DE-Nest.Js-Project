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
      name : 'Rungaroon',
      lastname: 'Sanguanrit',
      age: 19,
    };
  }
}
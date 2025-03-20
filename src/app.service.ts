import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  usePostman(): string {
    return 'We use Postman';
  }

  getJson() {
    return {
      name: 'Rungaroon',
      last: 'Sanguanrit',
      age: 20,
      version: process.env.API_VERSION,
    };
  }
}

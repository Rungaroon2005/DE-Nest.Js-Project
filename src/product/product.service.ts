import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  productFunc(): string {
    return 'Hello from Product Sevice';
  }
  getJSON() {
    return {
      name: 'Rungaroon',
      age: 19,
      hobby: 'Coding',
    };
  }
}

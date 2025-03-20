import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilityService {
  shareService(): string {
    throw new Error('Method not implemented.');
  }
  shareFunc(): string {
    return 'use shared module';
  }
}

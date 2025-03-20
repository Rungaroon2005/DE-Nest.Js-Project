import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalHelperService {
  globalFunc(): string {
    return 'We use GlobalFunc';
  }
}

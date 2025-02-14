import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Git & GitHub';
  }

  getGit2(): string {
    return 'git  and github using xxx';
  }
  getJson3() {
    return {
      name: 'Rungaroon',
    };
  }
}

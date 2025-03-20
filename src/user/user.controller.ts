import { Controller, Get } from '@nestjs/common';
import { UtilityService } from 'src/shared/utility/utility.service';

@Controller('user')
export class UserController {
  constructor(private readonly utilityservice: UtilityService) {}

  @Get('/user')
  shareFunc(): string {
    return this.utilityservice.shareFunc();
  }
}

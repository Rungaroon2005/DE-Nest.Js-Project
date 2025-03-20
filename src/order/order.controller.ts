import { Controller, Get } from '@nestjs/common';
import { UtilityService } from 'src/shared/utility/utility.service';

@Controller('order')
export class OrderController {
  constructor(private readonly utilityservice: UtilityService) {}

  @Get('/order')
  shareFunc(): string {
    return this.utilityservice.shareFunc();
  }
}

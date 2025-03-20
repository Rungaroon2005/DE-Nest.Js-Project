import { Controller, Get } from '@nestjs/common';
import { UtilityService } from 'src/shared/utility/utility.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly utilityservice: UtilityService) {}

  @Get('/chat')
  shareFunc(): string {
    return this.utilityservice.shareFunc();
  }
}

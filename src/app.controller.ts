import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // Root controller
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('json') // This defines the correct route
  getJson() {
    return this.appService.getJson();
  }
}

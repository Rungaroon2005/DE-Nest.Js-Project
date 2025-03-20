import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { UtilityService } from 'src/shared/utility/utility.service';

@Module({
  controllers: [OrderController],
  imports: [UtilityService],
})
export class OrderModule {}

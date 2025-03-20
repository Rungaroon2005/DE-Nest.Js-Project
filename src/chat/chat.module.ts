import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { UtilityService } from 'src/shared/utility/utility.service';

@Module({
  controllers: [ChatController],
  imports: [UtilityService],
})
export class ChatModule {}

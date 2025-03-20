import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UtilityService } from 'src/shared/utility/utility.service';

@Module({
  controllers: [UserController],
  imports: [UtilityService],
})
export class UserModule {}

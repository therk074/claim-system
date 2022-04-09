import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClaimNotifyService } from './claim-notify.service';

@Module({
  imports:[HttpModule],
  providers: [ClaimNotifyService],
  exports:[ClaimNotifyService]
})
export class ClaimNotifyModule {}

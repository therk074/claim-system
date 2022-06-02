import { Module } from '@nestjs/common';
import { ClaimQrcodeService } from './claim-qrcode.service';
import { ClaimQrcodeController } from './claim-qrcode.controller';
import { ClaimStoreModule } from '../claim-store/claim-store.module';

@Module({
  imports:[ClaimStoreModule],
  providers: [ClaimQrcodeService],
  controllers: [ClaimQrcodeController],
  exports:[ClaimQrcodeService]
})
export class ClaimQrcodeModule {}

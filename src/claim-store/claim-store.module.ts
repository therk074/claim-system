import { Module } from '@nestjs/common';
import { ClaimStoreService } from './claim-store.service';
import { ClaimStoreController } from './claim-store.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClaimStore, ClaimStoreSchema } from './schema/claim-store.schema';
import { UsersModule } from '../users/users.module';
import { StatusTypeModule } from '../status-type/status-type.module';
import { ClaimHistoryModule } from '../claim-history/claim-history.module';
import { ClaimNotifyModule } from '../claim-notify/claim-notify.module';
import { ClaimQrcodeModule } from '../claim-qrcode/claim-qrcode.module';

@Module({
  imports: [MongooseModule.forFeature([{
    name: ClaimStore.name,
    schema: ClaimStoreSchema
  }]),
    UsersModule,
    StatusTypeModule,
    ClaimHistoryModule,
    ClaimNotifyModule],
  providers: [ClaimStoreService],
  controllers: [ClaimStoreController],
  exports: [ClaimStoreService]
})
export class ClaimStoreModule { }

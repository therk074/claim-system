import { Module } from '@nestjs/common';
import { ClaimStoreService } from './claim-store.service';
import { ClaimStoreController } from './claim-store.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClaimStore, ClaimStoreSchema } from './schema/claim-store.schema';
import { UsersModule } from 'src/users/users.module';
import { StatusTypeModule } from 'src/status-type/status-type.module';
import { ClaimHistoryModule } from 'src/claim-history/claim-history.module';
import { ClaimNotifyModule } from 'src/claim-notify/claim-notify.module';
import { ClaimQrcodeModule } from 'src/claim-qrcode/claim-qrcode.module';

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

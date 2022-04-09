import { Module } from '@nestjs/common';
import { ClaimHistoryService } from './claim-history.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClaimHistory, ClaimHistorySchema } from './schema/claim-history.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: ClaimHistory.name, schema: ClaimHistorySchema }])],
  providers: [ClaimHistoryService],
  exports: [ClaimHistoryService]
})
export class ClaimHistoryModule { }

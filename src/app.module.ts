import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClaimStoreModule } from './claim-store/claim-store.module';
import { StatusTypeModule } from './status-type/status-type.module'; 
import { ClaimHistoryModule } from './claim-history/claim-history.module';
import { ClaimNotifyModule } from './claim-notify/claim-notify.module';
import { ClaimQrcodeModule } from './claim-qrcode/claim-qrcode.module';
@Module({
  imports: [AuthModule, 
  UsersModule, 
  MongooseModule.forRoot('mongodb://localhost/nest'), 
  ClaimStoreModule, 
  StatusTypeModule, 
  ClaimHistoryModule, 
  ClaimNotifyModule, ClaimQrcodeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { StatusTypeService } from './status-type.service';
import { StatusTypeController } from './status-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StatusType, StatusTypeSchema } from './schema/status-type.schema'; 
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[MongooseModule.forFeature([{ name: StatusType.name, schema: StatusTypeSchema }]),UsersModule],
  providers: [StatusTypeService],
  controllers: [StatusTypeController],
  exports:[StatusTypeService]
})
export class StatusTypeModule {}

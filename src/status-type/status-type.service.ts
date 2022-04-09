import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StatusType, StatusTypeDocument } from './schema/status-type.schema';
import { Model } from 'mongoose';

const logger = new Logger('status-type')
@Injectable()
export class StatusTypeService {
    constructor(@InjectModel(StatusType.name) private StatusTypeModel: Model<StatusTypeDocument>) { }

    async findAll() {
        logger.log(`Geting all Claim List`)
        return await this.StatusTypeModel.find({}, { _id: 0, updatedAt: 0, __v: 0 })
    }

    async findOne() {
        return await this.StatusTypeModel.findOne().sort({ status_id: -1 })
    }

    async findByStatusId(status_id:number){
        return await this.StatusTypeModel.findOne({status_id:status_id})
    }

    async create(CreateStatusTypeDto: any) {
        return new Promise(async (resolve, reject) => {
            try {
                let IdRun = 1
                let StatusId = await this.findOne()
                if (StatusId) { IdRun = StatusId.status_id + 1 }
                CreateStatusTypeDto.status_id = IdRun
                let CreateStatusType = new this.StatusTypeModel(CreateStatusTypeDto)
                await CreateStatusType.save()
                const msg = `Created Status Type. Id is ${IdRun}`
                resolve(msg)
                logger.log(msg)
            } catch (error) {
                logger.log(error);
                resolve(error.message);
            }
        })
    }
}

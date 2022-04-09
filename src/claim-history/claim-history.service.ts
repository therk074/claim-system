import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClaimHistory, ClaimHistoryDocument } from './schema/claim-History.schema';
import { Model } from 'mongoose';

const logger = new Logger('claim-history')
@Injectable()
export class ClaimHistoryService {
    constructor(@InjectModel(ClaimHistory.name) private ClaimHistoryModel: Model<ClaimHistoryDocument>) {
        // this.findAll()
        // this.findOne(1)
    }

    async findAll() {
        return await this.ClaimHistoryModel.find()
            .populate({ path: 'status_type', select: ['status_id', 'title'] })
            .populate({ path: 'claim_store', select: ['claim_id', 'title', 'customer_name'] })
    }

    async findOne(claim_id: any) {
        return await this.ClaimHistoryModel.find({ claim_store: claim_id })
            .populate({ path: 'status_type', select: ['status_id', 'title'] })
            .populate({ path: 'claim_store', select: ['claim_id', 'title', 'customer_name'] })
            .populate({ path: 'add_by', select: ['username'] })
            .sort({ createdAt: -1 })
    }

    async createHistory(createHistoryDto) {
        return new Promise(async (resolve, reject) => {
            try {
                let createHistory = new this.ClaimHistoryModel(createHistoryDto)
                createHistory.save()

                const msg = `Created History from ${createHistoryDto.claim_store}.`
                resolve(msg)
                logger.log(msg)
            } catch (error) {
                logger.log(error);
                resolve(error.message);
            }
        })
    }
}

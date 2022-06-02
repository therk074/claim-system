import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClaimStore, ClaimStoreDocument } from './schema/claim-store.schema';
import { Model } from 'mongoose';
import { StatusTypeService } from '../status-type/status-type.service';
import { ClaimHistoryService } from '../claim-history/claim-history.service';
import { UsersService } from '../users/users.service';
import { ClaimNotifyService } from '../claim-notify/claim-notify.service';
import { ClaimQrcodeService } from '../claim-qrcode/claim-qrcode.service';

const logger = new Logger('claim-store')
@Injectable()
export class ClaimStoreService {
    constructor(@InjectModel(ClaimStore.name) private ClaimStoreModel: Model<ClaimStoreDocument>,
        private StatusTypeService: StatusTypeService,
        private ClaimHistoryService: ClaimHistoryService,
        private UserService: UsersService,
        private ClaimNotifyService: ClaimNotifyService) {
    }

    async findAll() {
        logger.log(`Geting all Claim List`)
        return await this.ClaimStoreModel.find({}, { _id: 0, updatedAt: 0, __v: 0 }).populate({ path: 'status_type', select: ['status_id', 'title'] })
    }

    async findOne(claim_id: number) {
        return await this.ClaimStoreModel.findOne({ claim_id: claim_id })
    }

    async findHistory() {
        logger.log(`Geting all Claim History List`)
        return await this.ClaimHistoryService.findAll()
    }

    async findOneHistory(claim_id: number) {
        const claimId = await this.findOne(claim_id)
        if (!claimId) {
            const msg = `Cannot find Id: ${claim_id}.`
            logger.log(msg)
            return msg
        } 
        let claimHistory = await this.ClaimHistoryService.findOne(claimId._id)
        if (!claimHistory.length) {
            const msg = `Has no claim history from Id: ${claim_id}.`
            logger.log(msg)
            return msg
        }  
        return await this.ClaimHistoryService.findOne(claimId._id)
    }

    async create(CreateClaimStoreDto: any) {
        return new Promise(async (resolve, reject) => {
            try {
                let { token, ...data } = CreateClaimStoreDto

                let IdRun = 1
                let ClaimId = await this.ClaimStoreModel.findOne().sort({ claim_id: -1 })
                if (ClaimId) { IdRun = ClaimId.claim_id + 1 }
                data.claim_id = IdRun

                let StatusId = await this.StatusTypeService.findOne()
                data.status_type = StatusId._id

                data.link_status = `http://localhost:3000/claim-qr-code?id=${data.claim_id}`

                let CreateClaimStore = new this.ClaimStoreModel(data)
                await CreateClaimStore.save()

                await this.ClaimNotifyService.LineApi(token, data.title)

                const msg = `Created Order Id: ${IdRun}`
                resolve(msg)
                logger.log(msg)
            } catch (error) {
                logger.log(error);
                resolve(error.message);
            }
        })
    }

    async updateStatus(claimid: string, UpdateStatusDto: any, userinfo: any) {
        return new Promise(async (resolve, reject) => {
            try {
                const findId = await this.ClaimStoreModel.findOne({ claim_id: claimid })
                if (!findId) {
                    const msg = `Update Order Id: ${claimid} failed. Cannot find any order id.`
                    resolve(msg)
                    logger.log(msg)
                    return
                }
                const findStatus = await this.StatusTypeService.findByStatusId(UpdateStatusDto.status)
                if (!findStatus) {
                    const msg = `Update Order Id: ${claimid} failed. Cannot find status type.`
                    resolve(msg)
                    logger.log(msg)
                    return
                }
                await this.ClaimStoreModel.findByIdAndUpdate(findId._id, { status_type: findStatus._id })

                const user = await this.UserService.findOne(userinfo.username)
                await this.ClaimHistoryService.createHistory({
                    claim_store: findId._id,
                    status_type: findStatus._id,
                    add_by: user._id
                })

                const msg = `Updated Order Id: ${claimid}. Set status type as ${UpdateStatusDto.status}`
                resolve(msg)
                logger.log(msg)
            } catch (error) {
                logger.log(error);
                resolve(error.message);
            }
        })
    }


}

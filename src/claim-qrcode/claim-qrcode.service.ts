import { Injectable, Logger } from '@nestjs/common';
import * as QRCode from 'qrcode'
import { ClaimStoreService } from 'src/claim-store/claim-store.service';

const logger = new Logger('claim-QRCode')
@Injectable()
export class ClaimQrcodeService {
    constructor(private ClaimStoreService: ClaimStoreService) {
    }

    async createUrlQRCode(_id: any) {
        try {
            const findClaimStore = await this.ClaimStoreService.findOne(_id)
            const history = await this.ClaimStoreService.findOneHistory(_id)
            const DataURL = await QRCode.toDataURL(`http://localhost:3000/claim-qr-code/detail?id=${_id}`)
            logger.log('get url')  
            return { detail: findClaimStore, history:history[0],DataURL }
        } catch (error) {
            console.log(error)
        }
    }

    async dataUrlQRCode(_id: any) {
        try {
            const history = await this.ClaimStoreService.findOneHistory(_id)
            return {history:history}
        } catch (error) {
            console.log(error)
        }
    }
}

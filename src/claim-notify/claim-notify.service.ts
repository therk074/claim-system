import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
const qs = require('qs')

const logger = new Logger('claim-notify')
@Injectable()
export class ClaimNotifyService {
    constructor(private httpService: HttpService) {
    }

    async LineApi(token: string, msg: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const LineToken = token || 'DFOj46xXezz1CH76SEgvjayWxnizreuPIJd84XcGg1e'
                const LineURL = 'https://notify-api.line.me/api/notify'
                const headersRequest = {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${LineToken}`,
                };

                let data = { message: `Alert New Claim List: ${msg}` }
                const result = await this.httpService.post(LineURL, qs.stringify(data), { headers: headersRequest }).toPromise();
                const msgResult = `status: ${result.data.status} message: ${result.data.message}`
                logger.log(msgResult)
                resolve(msgResult)
            } catch (error) {
                logger.log(error.response.data)
                console.log(error)
            }
        })
    }
}

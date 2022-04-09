import { Get, Controller, Render, Request } from '@nestjs/common';
import { ClaimQrcodeService } from './claim-qrcode.service';

@Controller('claim-qr-code')
export class ClaimQrcodeController {
    constructor(private ClaimQrcodeService:ClaimQrcodeService){}

    @Get()
    @Render('index')
    async QRCode(@Request() req) {  
        return await this.ClaimQrcodeService.createUrlQRCode(req.query.id);
    }
    
    @Get('detail')
    @Render('detail')
    async dataUrlQRCode(@Request() req) {  
        return await this.ClaimQrcodeService.dataUrlQRCode(req.query.id);
    }
}

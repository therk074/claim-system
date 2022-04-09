import { Controller, Request, Post, UseGuards, Body, Get, UseInterceptors, Put, Param, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'; 
import { AdminGuard } from 'src/role/admin-roles.guard';
import { RepairGuard } from 'src/role/repair-roles.guard';
import { ClaimStoreService } from './claim-store.service';

@UseGuards(JwtAuthGuard)
@Controller('api/v1')
export class ClaimStoreController {
    constructor(private ClaimStoreService:ClaimStoreService){}

    @Get('claim-store')
    async findAll() { 
        return await this.ClaimStoreService.findAll()
    }

    @Post('claim-store') 
    @UseGuards(AdminGuard)
    @UseInterceptors(FileInterceptor(''))
    async create(@Body() CreateClaimStoreDto:any) { 
        return await this.ClaimStoreService.create(CreateClaimStoreDto)
    }

    @Put('claim-store/:claimid')
    @UseGuards(RepairGuard)
    @UseInterceptors(FileInterceptor(''))
    async updateStatus(@Param('claimid') claimid: string, @Body() UpdateStatusDto:any,@Request() userinfo) {  
        return await this.ClaimStoreService.updateStatus(claimid,UpdateStatusDto,userinfo.user)
    }

    @Get('claim-detail')
    async findHistory(@Request() req) { 
        if(req.query.id){
            return await this.ClaimStoreService.findOneHistory(req.query.id)
        }
        return await this.ClaimStoreService.findHistory()
    }
}

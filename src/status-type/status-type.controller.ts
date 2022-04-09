import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common'; 
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';  
import { AdminGuard } from 'src/role/admin-roles.guard';
import { StatusTypeService } from './status-type.service';

@UseGuards(JwtAuthGuard)
@Controller('api/v1/status-type')
export class StatusTypeController {
    constructor(private StatusTypeService:StatusTypeService){}

    @Get()
    async findAll() { 
        return await this.StatusTypeService.findAll()
    }

    @Post() 
    @UseGuards(AdminGuard)
    @UseInterceptors(FileInterceptor(''))
    async create(@Body() CreateStatusTypeDto:any) { 
        return await this.StatusTypeService.create(CreateStatusTypeDto)
    }
}

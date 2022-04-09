import { Controller, Request, Post, UseGuards, Body, Get, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('auth')
export class UsersController {
    constructor(private UsersService: UsersService,
        private authService: AuthService) { }

    // @UseGuards(AuthGuard('local'))
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    @Post('register') 
    @UseInterceptors(FileInterceptor(''))
    async register(@Body() CreateUserDto: any) {
        return await this.UsersService.create(CreateUserDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) { 
        return req.user;
    }
}

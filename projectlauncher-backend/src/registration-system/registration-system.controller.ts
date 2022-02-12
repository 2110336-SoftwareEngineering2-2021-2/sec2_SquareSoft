import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, Req } from '@nestjs/common';
import { query } from 'express';
import { RegistrationSystemService } from './registration-system.service';

@Controller('registration-system')
export class RegistrationSystemController {
    constructor(private productService: RegistrationSystemService) {}

    @Post('/donator')
    async registerUserDonator(@Body() newRegistration) {
        const result = await this.productService.registerUserDonator(newRegistration);
        return result;
    }

    @Post('/projectOwner')
    async registerUserProjectOwner(@Body() newRegistration) {
        const result = await this.productService.registerUserProjectOwner(newRegistration);
        return result;
    }

    @Get('/donator')
    async getUserDonator(@Query() query) {
        const result = await this.productService.getUserDonator(query);
        return result;
    }

    @Get('/projectOwner')
    async getUserProjectOwner(@Query() query) {
        const result = await this.productService.getUserProjectOwner(query);
        return result;
    }

}

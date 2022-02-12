import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { RegistrationSystemService } from './registration-system.service';

@Controller('registration-system')
export class RegistrationSystemController {
    constructor(private productService: RegistrationSystemService) {}

    @Post('/donator')
    async registerUserDonator(@Body() newRegistration) {
        try{
            const result = await this.productService.registerUserDonator(newRegistration);
            return result;
        }
        catch(err){
            throw new HttpException({
                "msg": "register failed: database error",
                "err": err
            }, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @Post('/projectOwner')
    async registerUserProjectOwner(@Body() newRegistration) {
        try{
            const result = await this.productService.registerUserProjectOwner(newRegistration);
            return result;
        }
        catch(err){
            throw new HttpException({
                "msg": "register failed: database error",
                "err": err
            }, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

}

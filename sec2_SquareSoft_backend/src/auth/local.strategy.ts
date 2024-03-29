import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            passReqToCallback: true
        });
    }

    async validate(req: Request, username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(req.body["role"], username, password);
        if (!user) {
            throw new UnauthorizedException("Incorrect username or password.");
        }
        return user;
    }
}
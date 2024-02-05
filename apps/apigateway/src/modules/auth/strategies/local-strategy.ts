import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy} from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy,'local') {
    constructor(private readonly authService: AuthService) {
        super();
    }

    // validate = async (user:string,password:string) => {
    //     const foundUser = await this.authService.validateUser(user, password);
    //     if (!foundUser) {
    //         throw new UnauthorizedException();
    //     }
    //     return foundUser;
    // }
}
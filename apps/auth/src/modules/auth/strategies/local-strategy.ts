import { Injectable,Logger} from "@nestjs/common";
import {RpcException} from '@nestjs/microservices'
import { PassportStrategy} from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from "../auth.service";
import { LoginUserDto } from "@/apigateway/src/modules/auth";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy,'local') {
    private readonly logger = new Logger(LocalStrategy.name);

    constructor(
        private readonly authService: AuthService
        ) {
        super();
    }

    validate = async (credentials:LoginUserDto) => {
         this.logger.debug(credentials)
        const foundUser = await this.authService.validateUser(credentials);
       
        this.logger.debug(foundUser)
        if (!foundUser) {
            throw new RpcException("Unauthorized Access.");
        }
        return foundUser;
    }
}
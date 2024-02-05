import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { RegisterUserDto,LoginUserDto } from './dto';
import { UserService } from '../user/user.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import {
  AUTH_SERVICE,
  AUTH_SERVICE_NAME,
  AuthServiceClient
 } from "@app/common";

@Injectable()
export class AuthService implements OnModuleInit {
    private authService: AuthServiceClient;
    constructor(@Inject(AUTH_SERVICE) private client: ClientGrpc) { }
    
    onModuleInit() {
        this.authService = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME)
    }
    
  async register(userData: RegisterUserDto) {
    return await this.authService.register(userData);
  }

  async login(userCredentials: LoginUserDto) {
    return await this.authService.login(userCredentials);
  }

  // async logOut() {}
  // async refreshToken() {}

  async refreshToken(user: any, token: string[]) {
    // await this.userService.saveUserRefreshToken(user, token);
  }

}

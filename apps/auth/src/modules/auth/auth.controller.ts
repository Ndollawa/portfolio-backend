import { Controller, UseGuards,Logger } from '@nestjs/common';
import * as grpc from '@grpc/grpc-js'
import { AuthService } from './auth.service';
import { CreateUserDto ,User,Empty, AuthServiceControllerMethods, AuthServiceController,LoginUserDto, RegisterUserDto} from '@app/common';
import { Observable } from 'rxjs';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
  @AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) { }
  
  @UseGuards(LocalAuthGuard)
 async login(loginUserDto: LoginUserDto) {
    Logger.debug('user-login')

  //  const user = await this.authService.validateUser(loginUserDto);
  //  Logger.debug(user)
    // const token = await this.authService.login(user);
       // create secure cookie with new accessToken
    // metadata.set('Set-Cookie', `jwt=${token?.refreshToken}; Path=/; HttpOnly;secure`);
  //  delete(token.refreshToken)
  return {accessToken:"hsdbdjbcdjbdj",refreshTokens:[]};
}


async register(registerUserDto: RegisterUserDto) {
    Logger.debug('user-reg')
    let user: User = await this.authService.register(registerUserDto);
    return user
  }

  async refreshToken(user:User) {
    return await this.authService.refreshToken(user);
  }

  logout(user:any = "you"):any {
    // let user: User;
    // this.authService.logout(id);
    return user
  }

}

import { Injectable ,Logger} from "@nestjs/common";
import { EMAIL_REGEX, RegisterUserDto,LoginUserDto, RequestService, User, compareHashData } from "@app/common";
import { UserService } from "../user";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";


@Injectable()
export  class AuthService{
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService,
        protected readonly requestService: RequestService,
        private readonly jwtService: JwtService) {
    }
    
    validateUser = async ({ user, password }:LoginUserDto) => {
    const userType = EMAIL_REGEX.test(user);
    const userQuery = userType ? { email: user } : { username: user };
    const foundUser = await this.userService.findUser(userQuery);
    this.logger.debug(user,password);
    if (foundUser && (await compareHashData(password, foundUser?.password))) {
        const {password, ...user } = foundUser;
        return user;
    }
        return null;
    }
// ,cookies:any
    login = async (user: User) => {   
    const roles = Object.values(user.roles! || {}).filter(Boolean);
        const payload = {
            user: user.email,
            sub: {
                    ...user,
                    roles,
            }
      }  
      const accessToken = this.jwtService.sign(payload)
      const newRefreshToken = this.jwtService.sign(payload,{expiresIn:'1h',secret: this.configService.getOrThrow('REFRESH_TOKEN_SECRET')})
     
     
    // let newRefeshTokenArray = !cookies?.jwt
    //   ? user.refreshToken
    //   : user.refreshToken.filter((rt) => rt !== cookies.jwt);
    // if (cookies?.jwt) {
    //   const refreshToken = cookies.jwt;
    //   const user = await this.userService.findUser({
    //     refreshToken,
    //   });
    //   if (!user) {
    //       newRefeshTokenArray = [];
    //   }
    // }
    //save refresh token of current user
    //     await this.userService.saveUserRefreshToken({
    //         id:user.id,refreshToken: [
    //   ...newRefeshTokenArray,
    //         newRefreshToken,
    // ]
    //     });
 
         
      return {accessToken, refreshToken:newRefreshToken}
    }

    register = async(registerUserDto:RegisterUserDto) => {
      return await this.userService.createUser(registerUserDto);
    }
    
    refreshToken = async (user: User) => {   
    const roles = Object.values(user.roles! || {}).filter(Boolean);
        const payload = {
            user: user.email,
            sub: {
                    ...user,
                    roles,
            }
      }  
        return { accessToken: this.jwtService.sign(payload) }
    }
  
    logout = async (user:User) => {
        
    }
}
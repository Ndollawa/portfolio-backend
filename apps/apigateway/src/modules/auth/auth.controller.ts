import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  Res,
  ValidationPipe,
  UnauthorizedException,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async registerUser(
    @Body(ValidationPipe) registerUserDto: RegisterUserDto,
  ) {
    return await this.authService.register(registerUserDto);
  }
// @UseGuards()
  @Post('login')
  async loginUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body(ValidationPipe) loginUserDto: LoginUserDto,
  ): Promise<any> {
    const foundUser = await this.authService.login(loginUserDto);
    console.log(foundUser)
    return "foundUser";
  }

  @Post('/logout')
  async logoutUser(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<boolean> {
    const cookies = req.cookies;
    if (!cookies?.jwt)
      throw new UnauthorizedException({ message: 'Unauthorized User' });
    const refreshToken = cookies.jwt;
    //on logout delete access token
    // const foundUser = await this.authService.findUser({ refreshToken });
    // if (!foundUser) {
    //   res.clearCookie('jwt', {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: 'none',
    //   });
    //   throw new UnauthorizedException(); // unauthorized
    // }
    // //delete refresh token from DB
    // const foundUserRrefreshToken = foundUser.refreshToken.filter(
    //   (rt) => rt !== refreshToken,
    // );
    // await this.authService.saveRefreshToken(foundUser, foundUserRrefreshToken);
    // res.clearCookie('jwt', {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'none',
    // });
    // throw new UnauthorizedException({ message: 'Unauthorized User' }); // unauthorized
    return true
  }

  
  @Get('/refresh')
  async refreshToken(@Req() req: Request, @Res() res: Response): Promise<any> {
    // return await this.authService.refeshToken(req.user)
    return {}
  }
}

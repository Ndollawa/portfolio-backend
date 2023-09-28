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
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserInterface } from 'src/user/interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async registerUser(
    @Body(ValidationPipe) registerUserDto: RegisterUserDto,
  ): Promise<UserInterface> {
    return await this.authService.register(registerUserDto);
  }

  @Post('/login')
  async loginUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body(ValidationPipe) loginUserDto: LoginUserDto,
  ): Promise<any> {
    const cookies = req.cookies;
    const foundUser = await this.authService.login(loginUserDto);
    const roles = Object.values(foundUser.roles! || {}).filter(Boolean);
    const accessToken = jwt.sign(
      {
        userInfo: {
          ...foundUser,
          roles,
        },
      },
      `${process.env.ACCESS_TOKEN_SECRET}`,
      { expiresIn: '3m' },
    );
    const newRefreshToken = jwt.sign(
      {
        userInfo: {
          ...foundUser,
          roles,
        },
      },
      `${process.env.REFRESH_TOKEN_SECRET}`,
      { expiresIn: '15m' },
    );
    let newRefeshTokenArray = !cookies?.jwt
      ? foundUser.refreshToken
      : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);
    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;
      const foundUser = await this.authService.findUser({
        refreshToken,
      });
      if (!foundUser) {
        newRefeshTokenArray = [];
      }
      res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
    }
    //save refresh token of current user
    await this.authService.saveRefreshToken([
      ...newRefeshTokenArray,
      newRefreshToken,
    ]);
    // create secure cookie with new accessToken
    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
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
    const foundUser = await this.authService.findUser({ refreshToken });
    if (!foundUser) {
      res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
      throw new UnauthorizedException(); // unauthorized
    }
    //delete refresh token from DB
    const foundUserRrefreshToken = foundUser.refreshToken.filter(
      (rt) => rt !== refreshToken,
    );
    await this.authService.saveRefreshToken(foundUserRrefreshToken);
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    throw new UnauthorizedException({ message: 'Unauthorized User' }); // unauthorized
  }

  @Get('/refresh')
  async refreshToken(@Req() req: Request, @Res() res: Response): Promise<any> {
    const cookies = req.cookies;
    if (!cookies?.jwt) throw new UnauthorizedException({ message: 'expired' });
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    //check for user  in the DB
    const foundUser = await this.authService.findUser({ refreshToken });
    // Detect refresh token reuse! (Hacked token)
    if (!foundUser) {
      jwt.verify(
        refreshToken,
        `${process.env.REFRESH_TOKEN_SECRET}`,
        async (error: any, decodedToken: any) => {
          // delete all tokens on reuse
          if (error)
            throw new ForbiddenException({ message: 'Access Forbidden' }); //Forbidden
          const hackedUser = await this.authService.findUser({
            email: decodedToken?.userInfo?.email,
          });
          if (hackedUser?._id) {
            hackedUser.refreshToken = [];
            await this.authService.saveRefreshToken([]);
          }
        },
      );
      throw new ForbiddenException({ message: 'Access Forbidden' }); // Forbidden
    }
    const newRefeshTokenArray = foundUser.refreshToken.filter(
      (rt) => rt !== refreshToken,
    );
    //evaluate jwt
    jwt.verify(
      refreshToken,
      `${process.env.REFRESH_TOKEN_SECRET}`,
      async (err: any, decodedToken: any) => {
        // console.log(decodedToken)
        if (err) {
          await this.authService.saveRefreshToken([...newRefeshTokenArray]);
        }
        if (err || foundUser.email !== decodedToken.userInfo.email)
          return res.status(403).json({ message: 'Access Forbidden' }); // forbidden
        //Refresh token was still valid
        const roles = Object.values(foundUser.roles!);
        const accessToken = jwt.sign(
          {
            userInfo: {
              ...foundUser,
              roles,
            },
          },
          `${process.env.ACCESS_TOKEN_SECRET}`,
          { expiresIn: '3m' },
        );
        const newRefreshToken = jwt.sign(
          {
            userInfo: {
              ...foundUser,
              roles,
            },
          },
          `${process.env.REFRESH_TOKEN_SECRET}`,
          { expiresIn: '15m' },
        );
        //save refresh token of current user
        await this.authService.saveRefreshToken([
          ...newRefeshTokenArray,
          newRefreshToken,
        ]);
        res.cookie('jwt', newRefreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ accessToken });
      },
    );
  }
}

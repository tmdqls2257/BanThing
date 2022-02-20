import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDTO } from '../dto/login.dto';
import { SignUpDTO } from 'src/dto/signup.dto';
import { AuthGuard } from '../token/auth.guard';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup') //회원가입
  async signUp(@Body() userDTO: SignUpDTO): Promise<object> {
    return await this.authService.signUp(userDTO);
  }

  @Post('/login') //로그인
  async logIn(
    @Res() res: Response,
    @Body() loginDTO: LoginDTO,
  ): Promise<object> {
    return await this.authService.logIn(loginDTO, res);
  }

  @Post('/logout') //로그아웃
  @UseGuards(AuthGuard) //토큰으로 유저 정보 확인
  async logOut(@Res() res: Response): Promise<object> {
    return await this.authService.logOut(res);
  }
}

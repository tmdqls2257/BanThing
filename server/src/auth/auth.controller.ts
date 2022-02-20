import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDTO } from '../dto/login.dto';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login') //로그인
  async logIn(
    @Res() res: Response,
    @Body() loginDTO: LoginDTO,
  ): Promise<object> {
    return await this.authService.logIn(loginDTO, res);
  }
}

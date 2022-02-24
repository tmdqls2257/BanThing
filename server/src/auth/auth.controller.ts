import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  Delete,
  Req,
  Get,
  Query,
  Header,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDTO } from '../dto/login.dto';
import { SignUpDTO } from 'src/dto/signup.dto';
import { AuthGuard } from '../token/auth.guard';
import { SignUpValidateDTO } from 'src/dto/signupValidate.dto';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup') //회원가입
  async signUp(@Body() userDTO: SignUpDTO): Promise<object> {
    return await this.authService.signUp(userDTO);
  }

  @Post('/signup/id') //아이디 중복확인
  async idValidate(@Body() validate: SignUpValidateDTO): Promise<object> {
    return await this.authService.idValidate(validate);
  }

  @Post('/signup/nickname') //닉네임 중복확인
  async nicknameValidate(@Body() validate: SignUpValidateDTO): Promise<object> {
    return await this.authService.nicknameValidate(validate);
  }

  @Delete('/signout') //회원탈퇴
  @UseGuards(AuthGuard) //토큰으로 유저 정보 확인
  async signOut(@Req() req: Request): Promise<object> {
    return await this.authService.signOut(req.user);
  }

  @Delete('kakaoUnlink') //카카오 회원탈퇴
  @UseGuards(AuthGuard) //토큰으로 유저 정보 확인
  async kakaoUnlink(@Req() req: Request, @Body() token: string) {
    return this.authService.kakaoUnlink(req.user, token);
  }

  @Post('/login') //로그인
  async logIn(@Res() res: Response, @Body() loginDTO: LoginDTO) {
    return await this.authService.logIn(loginDTO, res);
  }

  @Get('kakaoLogin') //카카오 로그인
  kakaoLogin(@Res() res: Response) {
    const _hostName = 'https://kauth.kakao.com';
    const _restApiKey = process.env.KAKAO_ID;
    const _redirectUrl = 'http://localhost:8080/users/kakaoLoginRedirect';
    const url = `${_hostName}/oauth/authorize?client_id=${_restApiKey}&redirect_uri=${_redirectUrl}&response_type=code`;
    return res.redirect(url);
  }

  @Get('kakaoLoginRedirect') //카카오 로그인
  kakaoLoginRedirect(@Query() qs, @Res() res: Response) {
    return this.authService.kakaoLogin(qs.code, res);
  }

  @Post('/logout') //로그아웃
  @UseGuards(AuthGuard) //토큰으로 유저 정보 확인
  logOut(@Res() res: Response): Promise<object> {
    return this.authService.logOut(res);
  }

  @Get('kakaoLogOut') //카카오 로그아웃
  //@UseGuards(AuthGuard) //토큰으로 유저 정보 확인
  kakaoLogOut(@Res() res: Response, @Body() token) {
    return this.authService.kakaoLogOut(res, token);
  }
}

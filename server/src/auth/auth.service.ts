import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDTO } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from '../token/payload';
import { Users } from '../entity/users.entity';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { SignUpDTO } from 'src/dto/signup.dto';
import { UserInfoDTO } from 'src/dto/userInfo.dto';
import { SignUpValidateDTO } from 'src/dto/signupValidate.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  //아이디 중복확인
  async idValidate(validate: SignUpValidateDTO): Promise<object> {
    const userFind: SignUpValidateDTO = await this.userService.findByFields({
      where: { user_id: validate.user_id },
    });
    if (userFind) {
      throw new HttpException('존재하는 아이디 입니다', HttpStatus.BAD_REQUEST);
    }
    return { data: null, message: '사용 가능' };
  }

  //닉네임 중복확인
  async nicknameValidate(validate: SignUpValidateDTO): Promise<object> {
    const nickFind: SignUpDTO = await this.userService.findByFields({
      where: { nickname: validate.nickname },
    });
    if (nickFind) {
      throw new HttpException('존재하는 닉네임 입니다', HttpStatus.BAD_REQUEST);
    }
    return { data: null, message: '사용 가능' };
  }

  //회원가입
  async signUp(newUser: SignUpDTO): Promise<object> {
    await this.userService.save(newUser);
    return { data: null, message: '회원가입 완료' };
  }

  //회원탈퇴
  //! any 존재
  async signOut(user: any): Promise<object> {
    await this.userService.delete(user.user_id);
    return { data: null, message: '회원탈퇴 완료' };
  }

  //로그인
  async logIn(loginDTO: LoginDTO, res: Response): Promise<object> {
    const userFind: Users = await this.userService.findByFields({
      where: { user_id: loginDTO.user_id },
    });
    if (!userFind) {
      throw new UnauthorizedException('잘못된 인증 정보 입니다!');
    }

    //비밀번호 복호화 및 검증
    const validatePassword = await bcrypt.compare(
      loginDTO.password,
      userFind.password,
    );
    if (!validatePassword) {
      throw new UnauthorizedException('잘못된 인증 정보 입니다!');
    }
    const payload: Payload = { id: userFind.id, user_id: userFind.user_id };
    const token = this.jwtService.sign(payload);
    return res
      .cookie('accessToken', token)
      .send({ data: { accessToken: token }, message: '로그인 완료' });
  }

  //로그아웃
  async logOut(res: Response): Promise<object> {
    return res
      .cookie('accessToken', '', { maxAge: 1 })
      .send({ data: null, message: '로그아웃' });
  }

  //토큰으로 사용자 정보 확인
  async tokenValidateUser(payload: Payload): Promise<UserInfoDTO> {
    return await this.userService.findByFields({
      where: { id: payload.id },
    });
  }
}

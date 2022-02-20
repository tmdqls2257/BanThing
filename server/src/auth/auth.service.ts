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

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  //회원가입
  async signUp(newUser: SignUpDTO): Promise<object> {
    const userFind: SignUpDTO = await this.userService.findByFields({
      where: { user_id: newUser.user_id },
    });
    const nickFind: SignUpDTO = await this.userService.findByFields({
      where: { nickname: newUser.nickname },
    });

    if (userFind) {
      throw new HttpException('존재하는 아이디 입니다', HttpStatus.BAD_REQUEST);
    }
    if (nickFind) {
      throw new HttpException('존재하는 닉네임 입니다', HttpStatus.BAD_REQUEST);
    }

    newUser.rating_count = 0;
    newUser.rating_score = 0;
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
      .cookie('set-cookie', token)
      .send({ data: null, message: '로그인 완료' });
  }

  //로그아웃
  async logOut(res: Response): Promise<object> {
    return res
      .cookie('set-cookie', '', { maxAge: 1 })
      .send({ data: null, message: '로그아웃' });
  }

  //토큰으로 사용자 정보 확인
  async tokenValidateUser(payload: Payload): Promise<UserInfoDTO> {
    return await this.userService.findByFields({
      where: { id: payload.id },
    });
  }
}

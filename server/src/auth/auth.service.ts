import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDTO } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from '../token/payload';
import { Users } from '../entity/users.entity';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

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
}

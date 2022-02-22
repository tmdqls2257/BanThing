import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { UserInfoDTO } from 'src/dto/userInfo.dto';
import { AuthService } from '../auth/auth.service';
import { Payload } from './payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRETKEY,
    });
  }

  //! 토큰을 가지고 유저정보 controller에 전달 (전달방식이 Reqest)
  async validate(payload: Payload, done: VerifiedCallback): Promise<any> {
    const user: UserInfoDTO = await this.authService.tokenValidateUser(payload);

    if (!user) {
      return done(
        new UnauthorizedException({ message: '존재하지 않는 회원입니다.' }),
        false,
      );
    }
    return done(null, user);
  }
}

import { Injectable } from '@nestjs/common';
import { UserService } from 'src/auth/user.service';
import { TransPasswordDTO } from 'src/dto/transpassword.dto';
import { getConnection } from 'typeorm';
import { Users } from 'src/entity/users.entity';
import { KakaoTokenDTO } from 'src/dto/kakaoToken.dto';
import axios from 'axios';

@Injectable()
export class MypageService {
  constructor(private userService: UserService) {}

  //마이페이지
  async userInfo(user: any): Promise<object> {
    user.password = undefined;
    return { data: { userInfo: user }, message: '회원정보' };
  }

  //카카오 마이페이지
  // async kakaoInfo(token: KakaoTokenDTO) {
  //   const _header = {
  //     Authorization: `Bearer ${token}`,
  //   };
  //   const data = await axios.post(
  //     'https://kapi.kakao.com/v2/user/me',
  //     {},
  //     { headers: _header },
  //   );
  //   const user = {
  //     user_id: data.data.kakao_account.email,
  //     nickname: data.data.properties.nickname,
  //   };
  //   return { data: { userInfo: user }, message: '회원정보' };
  // }

  //비밀번호 변경
  async editPassword(user: any, password: TransPasswordDTO) {
    user.password = password.password;
    await this.userService.transformPassword(user).then((transPassword) => {
      getConnection()
        .createQueryBuilder()
        .update(Users)
        .set({
          password: transPassword,
        })
        .where(`user_id = '${user.user_id}'`)
        .execute();
    });
    return { data: null, message: '비밀번호 변경 완료' };
  }
}

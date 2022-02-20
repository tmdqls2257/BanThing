import { Injectable } from '@nestjs/common';

@Injectable()
export class MypageService {
  //마이페이지
  async userInfo(user: any): Promise<object> {
    user.password = undefined;
    return { data: { userInfo: user }, message: '회원정보' };
  }
}

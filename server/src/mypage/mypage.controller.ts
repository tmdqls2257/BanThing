import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/token/auth.guard';
import { MypageService } from './mypage.service';

@Controller('mypage')
export class MypageController {
  constructor(private myPageService: MypageService) {}

  @Get() //마이페이지
  @UseGuards(AuthGuard)
  async userInfo(@Req() req: Request): Promise<object> {
    return await this.myPageService.userInfo(req.user);
  }
}

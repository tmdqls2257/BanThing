import { Controller, Get, Post, Body } from '@nestjs/common';
import { MainPageService } from './main-page.service';

@Controller('main')
export class MainPageController {
  constructor(private mainPageService: MainPageService) {}

  @Get() //방리스트(메인페이지)
  async postList(): Promise<object> {
    return await this.mainPageService.postList();
  }

  @Post() //방정보(marker click)
  async postInfo(@Body() id: number): Promise<object> {
    return await this.mainPageService.postInfo(id);
  }
}

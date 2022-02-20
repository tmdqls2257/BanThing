import { Controller, Get } from '@nestjs/common';
import { MainPageService } from './main-page.service';

@Controller('main')
export class MainPageController {
  constructor(private mainPageService: MainPageService) {}

  @Get() //방리스트(메인페이지)
  async roomList(): Promise<object> {
    return await this.mainPageService.roomList();
  }
}

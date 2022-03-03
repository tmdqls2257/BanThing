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
} from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  //  @Get() // 가입된 모든 유저 정보 가져오기

  //  @Delete() // 가입된 유저 어드민 권한으로 강제 탈퇴
}

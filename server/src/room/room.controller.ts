import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { AuthGuard } from 'src/token/auth.guard';
import { CreateRoomDTO } from 'src/dto/createRoom.dto';
import { Request } from 'express';

@Controller('rooms')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Post() //방 생성
  @UseGuards(AuthGuard) //토큰으로 유저 정보 확인
  async roomCreate(
    @Body() roomDTO: CreateRoomDTO,
    @Req() req: Request,
  ): Promise<object> {
    return await this.roomService.create(roomDTO, req.user);
  }
}

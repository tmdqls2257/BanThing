import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { AuthGuard } from 'src/token/auth.guard';
import { CreateRoomDTO } from 'src/dto/createRoom.dto';
import { Request } from 'express';
import { ChatDTO } from 'src/dto/chat.dto';
import { EvaluationDTO } from 'src/dto/evaluation.dto';

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

  @Post('/chat') //채팅로그 저장
  @UseGuards(AuthGuard) //토큰으로 유저 정보 확인
  async chatLog(
    @Body() chatDTO: ChatDTO,
    @Req() req: Request,
  ): Promise<object> {
    return await this.roomService.chatLog(chatDTO, req.user);
  }

  @Get('/chat/:id') //채팅로그 받기(방 입장)
  @UseGuards(AuthGuard) //토큰으로 유저 정보 확인
  async getChat(@Param('id') id: number): Promise<object> {
    return await this.roomService.getChat(id);
  }

  @Post('/evaluation') //평가하기
  @UseGuards(AuthGuard) //토큰으로 유저 정보 확인
  async evaluation(
    @Body() evaluationDTO: EvaluationDTO,
    @Req() req: Request,
  ): Promise<object> {
    return await this.roomService.evaluation(evaluationDTO, req.user);
  }
}

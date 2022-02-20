import { Injectable } from '@nestjs/common';
import { CreateRoomDTO } from 'src/dto/createRoom.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomRepository } from './room.repository';
import { ChatDTO } from 'src/dto/chat.dto';
import { ChatLogRepository } from './chat.repository';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomRepository)
    private roomRepository: RoomRepository,
    @InjectRepository(ChatLogRepository)
    private chatLogRepository: ChatLogRepository,
  ) {}

  //방 생성
  async create(roomDTO: CreateRoomDTO, user: any): Promise<object> {
    roomDTO.host_user_id = user.user_id;
    roomDTO.host_nickname = user.nickname;
    await this.roomRepository.save(roomDTO);
    return { data: null, message: '방 생성 완료' };
  }

  //채팅 저장
  async chatLog(chatDTO: ChatDTO, user: any): Promise<object> {
    chatDTO.nickname = user.nickname;
    await this.chatLogRepository.save(chatDTO);
    return { data: null, message: 'chatLog 저장 완료' };
  }
}

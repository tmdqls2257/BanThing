import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomRepository } from 'src/room/room.repository';

@Injectable()
export class MainPageService {
  constructor(
    @InjectRepository(RoomRepository)
    private roomRepository: RoomRepository,
  ) {}

  //방 리스트(메인페이지)
  async roomList(): Promise<object> {
    const list = await this.roomRepository.find();
    list.map(function (el) {
      el.content = undefined;
      el.host_nickname = undefined;
      el.host_role = undefined;
      el.host_user_id = undefined;
      el.title = undefined;
    });

    return { data: { roomList: list }, message: '모든 방 리스트' };
  }

  //방 정보
  async roomInfo(id: number): Promise<object> {
    const room = await this.roomRepository.findOne(id);
    room.host_user_id = undefined;
    room.location_latitude = undefined;
    room.location_longitude = undefined;
    return { data: { room: room }, message: '방 정보' };
  }
}

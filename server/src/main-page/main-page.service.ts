import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from 'src/post/post.repository';

@Injectable()
export class MainPageService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
  ) {}

  //글 리스트(메인페이지)
  async postList(): Promise<object> {
    const list = await this.postRepository.find();
    list.map(function (el) {
      el.content = undefined;
      el.host_nickname = undefined;
      el.host_role = undefined;
      el.host_user_id = undefined;
      el.title = undefined;
    });

    return { data: { roomList: list }, message: '모든 방 리스트' };
  }

  //글 정보
  async postInfo(id: number): Promise<object> {
    const room = await this.postRepository.findOne(id);
    room.host_user_id = undefined;
    room.location_latitude = undefined;
    room.location_longitude = undefined;
    return { data: { room: room }, message: '방 정보' };
  }
}

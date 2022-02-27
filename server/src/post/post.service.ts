import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePostDTO } from 'src/dto/createPost.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { ReplyDTO } from 'src/dto/reply.dto';
import { ReplyLogRepository } from './reply.repository';
import { Users } from 'src/entity/users.entity';
import { UserService } from 'src/auth/user.service';
import { KakaoTokenDTO } from 'src/dto/kakaoToken.dto';
import axios from 'axios';
import { KakaoInfoDTO } from 'src/dto/kakaoInfo.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
    @InjectRepository(ReplyLogRepository)
    private replyLogRepository: ReplyLogRepository,
    private userService: UserService,
  ) {}

  //방 생성
  async create(postDTO: CreatePostDTO, user: any): Promise<object> {
    postDTO.host_user_id = user.user_id;
    postDTO.host_nickname = user.nickname;
    const data = await this.postRepository.save(postDTO);
    return { data: { post_id: data.id }, message: '글 게시 완료' };
  }

  //방 생성(카카오)
  async createKakao(
    postDTO: CreatePostDTO,
    token: KakaoTokenDTO,
  ): Promise<object> {
    const info = await this.getInfoKakao(token);

    postDTO.host_user_id = info.user_id;
    postDTO.host_nickname = info.nickname;

    const data = await this.postRepository.save(postDTO);

    return { data: { post_id: data.id }, message: '글 게시 완료' };
  }

  //채팅 저장
  async reply(replyDTO: ReplyDTO, user: any): Promise<object> {
    replyDTO.nickname = user.nickname;
    await this.replyLogRepository.save(replyDTO);
    return { data: null, message: 'reply 저장 완료' };
  }

  //채팅 저장(카카오)
  async replyKakao(replyDTO: ReplyDTO, token: KakaoTokenDTO): Promise<object> {
    const info = await this.getInfoKakao(token);

    replyDTO.nickname = info.nickname;
    await this.replyLogRepository.save(replyDTO);
    return { data: null, message: 'reply 저장 완료' };
  }

  //채팅 받기(방입장)
  async getReply(post_id: number): Promise<object> {
    const list = await this.replyLogRepository.find({
      where: { post_id: post_id },
    });
    return { data: { replyLog: list }, message: 'Reply 리스트' };
  }

  //채팅 받기(카카오)
  async getReplyKakao(post_id: number, token: KakaoTokenDTO): Promise<object> {
    await this.getInfoKakao(token);

    const list = await this.replyLogRepository.find({
      where: { post_id: post_id },
    });
    return { data: { replyLog: list }, message: 'Reply 리스트' };
  }

  //글 삭제
  async deletePost(id: number, user: any): Promise<object> {
    const post = await this.postRepository.findOne({
      where: { id: id },
    });
    if (post.host_user_id === user.user_id) {
      await this.postRepository.delete({ id });
      await this.replyLogRepository.delete({ post_id: id });
    }
    return { data: null, message: '글 삭제 완료' };
  }

  //글 삭제(카카오)
  async deletePostKakao(id: number, token: KakaoTokenDTO): Promise<object> {
    const info = await this.getInfoKakao(token);
    const post = await this.postRepository.findOne({ where: { id: id } });

    if (post.host_user_id === info.user_id) {
      await this.postRepository.delete({ id });
      await this.replyLogRepository.delete({ post_id: id });
    }
    return { data: null, message: '글 삭제 완료' };
  }

  //토큰 유효성검사(카카오)
  async getInfoKakao(token: KakaoTokenDTO) {
    const header = {
      Authorization: `Bearer ${token}`,
    };
    const sign = await axios.post(
      'https://kapi.kakao.com/v2/user/me',
      {},
      { headers: header },
    );

    const userFind: Users = await this.userService.findByFields({
      where: { user_id: sign.data.kakao_account.email },
    });

    if (!userFind) {
      throw new HttpException('Unauthorized', HttpStatus.BAD_REQUEST);
    }
    const info: KakaoInfoDTO = {
      user_id: sign.data.kakao_account.email,
      nickname: sign.data.properties.nickname,
    };
    return info;
  }
}

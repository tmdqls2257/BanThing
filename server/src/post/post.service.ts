import { Injectable } from '@nestjs/common';
import { CreatePostDTO } from 'src/dto/createPost.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { ReplyDTO } from 'src/dto/reply.dto';
import { ChatLogRepository } from './reply.repository';
import { EvaluationDTO } from 'src/dto/evaluation.dto';
import { getConnection } from 'typeorm';
import { Users } from 'src/entity/users.entity';
import { UserService } from 'src/auth/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private roomRepository: PostRepository,
    @InjectRepository(ChatLogRepository)
    private chatLogRepository: ChatLogRepository,
    private userService: UserService,
  ) {}

  //방 생성
  async create(roomDTO: CreatePostDTO, user: any): Promise<object> {
    roomDTO.host_user_id = user.user_id;
    roomDTO.host_nickname = user.nickname;
    await this.roomRepository.save(roomDTO);
    return { data: null, message: '글 게시 완료' };
  }

  //채팅 저장
  async chatLog(chatDTO: ReplyDTO, user: any): Promise<object> {
    chatDTO.nickname = user.nickname;
    await this.chatLogRepository.save(chatDTO);
    return { data: null, message: 'reply 저장 완료' };
  }

  //채팅 받기(방입장)
  async getChat(rooms_id: number): Promise<object> {
    const list = await this.chatLogRepository.find({
      where: { rooms_id: rooms_id },
    });
    return { data: { replyLog: list }, message: 'Reply 리스트' };
  }

  //평가하기
  // async evaluation(evaluationDTO: EvaluationDTO, user: any): Promise<object> {
  //   //점수 반영
  //   await this.userService
  //     .findByFields({
  //       where: { nickname: evaluationDTO.nickname },
  //     })
  //     .then((user) => {
  //       getConnection()
  //         .createQueryBuilder()
  //         .update(Users)
  //         .set({
  //           rating_score: user.rating_score + evaluationDTO.rating_score,
  //           rating_count: user.rating_count + 1,
  //         })
  //         .where(`nickname = '${evaluationDTO.nickname}'`)
  //         .execute();
  //     });

  //   // 방 삭제, 채팅로그 삭제 (Case by host)
  //   const id = evaluationDTO.rooms_id;
  //   const room = await this.roomRepository.findOne(id);
  //   if (room.host_user_id === user.user_id) {
  //     //방 삭제
  //     await this.roomRepository.delete({ id });

  //     //채팅로그 삭제
  //     const rooms_id = id;
  //     await this.chatLogRepository.delete({ rooms_id });
  //   }

  //   return { data: null, message: '평가 완료' };
  // }
}

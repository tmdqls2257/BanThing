import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from 'src/token/auth.guard';
import { CreatePostDTO } from 'src/dto/createPost.dto';
import { Request } from 'express';
import { ReplyDTO } from 'src/dto/reply.dto';
import { EvaluationDTO } from 'src/dto/evaluation.dto';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post() //글 게시
  @UseGuards(AuthGuard) //토큰으로 유저 정보 확인
  async postCreate(
    @Body() postDTO: CreatePostDTO,
    @Req() req: Request,
  ): Promise<object> {
    return await this.postService.create(postDTO, req.user);
  }

  @Post('/reply') //댓글 저장
  @UseGuards(AuthGuard) //토큰으로 유저 정보 확인
  async reply(
    @Body() replyDTO: ReplyDTO,
    @Req() req: Request,
  ): Promise<object> {
    return await this.postService.reply(replyDTO, req.user);
  }

  @Get('/reply/:id') //댓글 받기(방 입장)
  @UseGuards(AuthGuard) //토큰으로 유저 정보 확인
  async getReply(@Param('id') id: number): Promise<object> {
    return await this.postService.getReply(id);
  }

  // @Post('/evaluation') //평가하기
  // @UseGuards(AuthGuard) //토큰으로 유저 정보 확인
  // async evaluation(
  //   @Body() evaluationDTO: EvaluationDTO,
  //   @Req() req: Request,
  // ): Promise<object> {
  //   return await this.postService.evaluation(evaluationDTO, req.user);
  // }
}

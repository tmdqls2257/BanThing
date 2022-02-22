import { Module } from '@nestjs/common';
import { RoomController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { ChatLogRepository } from './reply.repository';
import { UserRepository } from 'src/auth/user.repository';
import { UserService } from 'src/auth/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostRepository,
      ChatLogRepository,
      UserRepository,
    ]),
  ],
  controllers: [RoomController],
  providers: [PostService, UserService],
})
export class RoomModule {}

import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomRepository } from './room.repository';
import { ChatLogRepository } from './chat.repository';
import { UserRepository } from 'src/auth/user.repository';
import { UserService } from 'src/auth/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoomRepository,
      ChatLogRepository,
      UserRepository,
    ]),
  ],
  controllers: [RoomController],
  providers: [RoomService, UserService],
})
export class RoomModule {}

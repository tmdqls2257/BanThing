import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomRepository } from './room.repository';
import { ChatLogRepository } from './chat.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoomRepository, ChatLogRepository])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}

import { Module } from '@nestjs/common';
import { ChatBackEndGateway } from './socket.gateway';
import { ChatRoomService } from './socket.service';

@Module({
  providers: [ChatBackEndGateway, ChatRoomService],
})
export class ChatBackEndModule {}

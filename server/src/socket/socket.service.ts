import { Injectable } from '@nestjs/common';
import { chatRoomListDTO } from '../dto/socket.dto';
import { Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ChatRoomService {
  private chatRoomList: Record<string, chatRoomListDTO>;
  constructor() {
    this.chatRoomList = {
      'room:lobby': {
        roomId: 'room:lobby',
        roomName: '로비',
        cheifId: null,
      },
    };
  }
  createChatRoom(client: Socket, post_id: string): void {
    const roomId = `room:${post_id}`;
    const roomName = uuidv4;
    // return this.chatRoomList[roomId];
    this.chatRoomList[roomId] = {
      roomId,
      cheifId: client.id,
      roomName,
    };
    client.data.roomId = roomId;
    client.rooms.clear();
    client.join(roomId);
  }

  enterChatRoom(client: Socket, post_id: string) {
    client.leave(client.id);
    client.data.roomId = `room:${post_id}`;
    client.rooms.clear();
    client.join(`room:${post_id}`);
    const { nickname } = client.data;
    const { roomName } = this.getChatRoom(`room:${post_id}`);
    client.to(`room:${post_id}`).emit('getMessage', {
      id: null,
      nickname: '안내',
      message: `"${nickname}"님이 "${roomName}"방에 접속하셨습니다.`,
    });
  }

  exitChatRoom(client: Socket, post_id: string) {
    client.data.roomId = `room:lobby`;
    client.rooms.clear();
    client.join(`room:lobby`);
    const { nickname } = client.data;
    client.to(`room:${post_id}`).emit('getMessage', {
      id: null,
      nickname: '안내',
      message: '"' + nickname + '"님이 방에서 나갔습니다.',
    });
  }

  getChatRoom(post_id: string): chatRoomListDTO {
    return this.chatRoomList[post_id];
  }

  getChatRoomList(): Record<string, chatRoomListDTO> {
    return this.chatRoomList;
  }

  deleteChatRoom(client: Socket, post_id: string) {
    delete this.chatRoomList[post_id];
  }
}

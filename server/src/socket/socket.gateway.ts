import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatRoomService } from './socket.service';
import { setInitDTO } from '../dto/socket.dto';

@WebSocketGateway(5000, {
  cors: {
    origin: 'http://localhost:3000',
  },
})
export class ChatBackEndGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly ChatRoomService: ChatRoomService) {}
  @WebSocketServer()
  server: Server;

  //소켓 연결시 유저목록에 추가
  public handleConnection(client: Socket): void {
    client.leave(client.id);
    client.data.roomId = `room:lobby`;
    client.join('room:lobby');
  }

  //소켓 연결 해제시 유저목록에서 제거
  public handleDisconnect(client: Socket): void {
    const { roomId } = client.data;
    if (
      roomId != 'room:lobby' &&
      !this.server.sockets.adapter.rooms.get(roomId)
    ) {
      this.ChatRoomService.deleteChatRoom(client, roomId);
      this.server.emit(
        'getChatRoomList',
        this.ChatRoomService.getChatRoomList(),
      );
    }
  }

  //메시지가 전송되면 모든 유저에게 메시지 전송
  @SubscribeMessage('sendMessage')
  sendMessage(client: Socket, message: string): void {
    client.rooms.forEach((roomId) =>
      client.to(roomId).emit('getMessage', {
        id: client.id,
        nickname: client.data.nickname,
        message,
      }),
    );
  }

  //처음 접속시 닉네임 등 최초 설정
  @SubscribeMessage('setInit')
  setInit(client: Socket, data: setInitDTO): setInitDTO {
    // 이미 최초 세팅이 되어있는 경우 패스
    if (client.data.isInit) {
      return;
    }
    client.data.nickname = data.nickname;

    client.data.isInit = true;

    return {
      nickname: client.data.nickname,
      room: {
        roomId: 'room:lobby',
        roomName: '로비',
      },
    };
  }

  //닉네임 변경
  @SubscribeMessage('setNickname')
  setNickname(client: Socket, nickname: string): void {
    const { roomId } = client.data;
    // client.to(roomId).emit('getMessage', {
    //   id: null,
    //   nickname: '안내',
    //   message: `"${client.data.nickname}"님이 "${nickname}"으로 닉네임을 변경하셨습니다.`,
    // });
    client.data.nickname = nickname;
  }

  //채팅방 목록 가져오기
  // @SubscribeMessage('getChatRoomList')
  // getChatRoomList(client: Socket, payload: any) {
  //   client.emit('getChatRoomList', this.ChatRoomService.getChatRoomList());
  // }

  //채팅방 생성하기
  @SubscribeMessage('createChatRoom')
  createChatRoom(client: Socket, post_id: string) {
    //이전 방이 만약 나 혼자있던 방이면 제거
    // if (
    //   client.data.roomId != 'room:lobby' &&
    //   this.server.sockets.adapter.rooms.get(client.data.roomId).size == 1
    // ) {
    //   this.ChatRoomService.deleteChatRoom(client.data.roomId);
    // }

    this.ChatRoomService.createChatRoom(client, post_id);
    return {
      roomId: client.data.roomId,
      //roomName: this.ChatRoomService.getChatRoom(client.data.roomId).roomName,
    };
  }

  //채팅방 들어가기
  @SubscribeMessage('enterChatRoom')
  enterChatRoom(client: Socket, roomId: string) {
    //이미 접속해있는 방 일 경우 재접속 차단
    if (client.rooms.has(roomId)) {
      return;
    }
    console.log(client.id);
    //이전 방이 만약 나 혼자있던 방이면 제거
    // if (
    //   client.data.roomId != 'room:lobby' &&
    //   this.server.sockets.adapter.rooms.get(client.data.roomId).size == 1
    // ) {
    //   this.ChatRoomService.deleteChatRoom(client.data.roomId);
    // }
    this.ChatRoomService.enterChatRoom(client, roomId);
    return {
      roomId: roomId,
      //roomName: this.ChatRoomService.getChatRoom(roomId).roomName,
    };
  }

  //채팅방 나가기
  @SubscribeMessage('exitChatRoom')
  exitChatRoom(client: Socket, roomId: string) {
    this.ChatRoomService.exitChatRoom(client, roomId);
    return {
      roomId: roomId,
      //roomName: this.ChatRoomService.getChatRoom(roomId).roomName,
    };
  }

  //채팅방 삭제하기
  @SubscribeMessage('deleteChatRoom')
  deleteChatRoom(client: Socket, roomId: string) {
    this.ChatRoomService.deleteChatRoom(client, roomId);
    return {
      roomId: roomId,
      //roomName: this.ChatRoomService.getChatRoom(roomId).roomName,
    };
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { RoomModule } from './room/room.module';
import { Rooms } from './entity/rooms.entity';
import { ChatLogs } from './entity/chatLogs.entity';
import { MypageModule } from './mypage/mypage.module';
import { MainPageModule } from './main-page/main-page.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_USERNAME || 'localhost',
      port: 3306,
      username: process.env.DATABASE_USERNAME || 'root',
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME || 'BanThing',
      entities: [Users, Rooms, ChatLogs],
      synchronize: true, //테이블을 자동으로 생성 개발모드일때만 사용 운영모드일때는 삭제
    }),
    AuthModule,
    RoomModule,
    MypageModule,
    MainPageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

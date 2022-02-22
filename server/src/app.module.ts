import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { RoomModule } from './post/post.module';
import { Post } from './entity/post.entity';
import { Reply } from './entity/reply.entity';
import { MypageModule } from './mypage/mypage.module';
import { MainPageModule } from './main-page/main-page.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Users, Post, Reply],
      //synchronize: true, //테이블을 자동으로 생성 개발모드일때만 사용 운영모드일때는 삭제
    }),
    AuthModule,
    RoomModule,
    MypageModule,
    MainPageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*'); //middleware들은 consumer에다가 연결한다!
  }
}

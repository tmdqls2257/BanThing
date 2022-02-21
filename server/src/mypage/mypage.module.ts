import { Module } from '@nestjs/common';
import { UserService } from 'src/auth/user.service';
import { MypageController } from './mypage.controller';
import { MypageService } from './mypage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../auth/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [MypageController],
  providers: [MypageService, UserService],
})
export class MypageModule {}

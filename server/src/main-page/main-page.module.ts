import { Module } from '@nestjs/common';
import { MainPageController } from './main-page.controller';
import { MainPageService } from './main-page.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomRepository } from '../room/room.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoomRepository])],
  controllers: [MainPageController],
  providers: [MainPageService],
})
export class MainPageModule {}

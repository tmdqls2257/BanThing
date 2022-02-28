import { Module } from '@nestjs/common';
import { MainPageController } from './main-page.controller';
import { MainPageService } from './main-page.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from '../post/post.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository])],
  controllers: [MainPageController],
  providers: [MainPageService],
})
export class MainPageModule {}

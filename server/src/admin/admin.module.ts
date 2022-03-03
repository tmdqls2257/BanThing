import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user.repository';
import { UserService } from 'src/auth/user.service';
import { AdminController } from './admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [AdminController],
  providers: [UserService],
})
export class AdminModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user.repository';
import { Users } from '../entity/users.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  // 모든 유저 정보를 가져오는 함수 (admin)
  // async findAll(): Promise<Users> {
  //   return await this.userRepository.find();
  // }
}

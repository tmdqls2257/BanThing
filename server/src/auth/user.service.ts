import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions } from 'typeorm';
import { SignUpDTO } from '../dto/signup.dto';
import { UserRepository } from './user.repository';
import { Users } from '../entity/users.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  //이미 회원가입이 되어있는 사용자인지 찾는 함수
  async findByFields(
    options: FindOneOptions<SignUpDTO>,
  ): Promise<Users | undefined> {
    return await this.userRepository.findOne(options);
  }
}

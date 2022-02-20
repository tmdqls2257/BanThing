import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions } from 'typeorm';
import { SignUpDTO } from '../dto/signup.dto';
import { UserRepository } from './user.repository';
import { Users } from '../entity/users.entity';
import * as bcrypt from 'bcrypt';
import { UserInfoDTO } from '../dto/userInfo.dto';

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

  //회원가입 함수
  async save(userDTO: SignUpDTO): Promise<SignUpDTO | undefined> {
    const password = await this.transformPassword(userDTO);
    userDTO.password = password;
    return await this.userRepository.save(userDTO);
  }

  //비밀번호 암호화
  async transformPassword(user: SignUpDTO | UserInfoDTO): Promise<string> {
    return await bcrypt.hash(user.password, 12);
  }
}

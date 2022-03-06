import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user.repository';
import { createQueryBuilder } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  // 모든 유저 정보를 가져오는 함수 (admin)
  async getAll() {
    // const allUsers = await this.userRepository.find();

    //? 아래의 코드는 getConnection을 사용해서 작성할 수도 있다.
    //참고링크 : https://itchallenger.tistory.com/230
    const result = await createQueryBuilder('Users')
      .select(['Users.nickname', 'Users.auth', 'Users.isAdmin'])
      .getMany();
    return result;
    //! execute()는 Insert, Update, Delete 와 같이 db가 변경될 때만 호출하는 함수이다.
  }

  async deleteAccount(nickname: string): Promise<any> {
    //! 아래 코드는 해당 nickname을 가진 계정이 없어도 에러를 띄우지 않는다는 문제가 있다.
    // try {
    // await createQueryBuilder('Users').delete().where({ nickname }).execute();
    // } catch (err) {
    // console.log(err);
    // }

    //* 먼저 findOne으로 해당 계정이 있는지 확인한다.
    //* 있다면 delete 함수를 사용해서 해당 계정을 삭제한다.
    //* 없다면 해당 계정이 없다는 메세지를 보낸다.
    //* 상태코드 사용하고 싶으면 express에서 Res를 import해와야 한다.
    //* res.status('상태코드')
    //* 대신 이렇게 사용한 경우 res.send를 리턴해야 한다. (완전 express 방식)
    const result = await this.userRepository.findOne({ nickname });
    if (result) {
      this.userRepository.delete({ nickname });
      //* delete는 조건에 맞는 여러개를 지운다.
      return { data: null, message: 'delete was success' };
    }

    return { data: null, message: `account you're looking for is not exist` };
  }
}

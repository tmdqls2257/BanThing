import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../token/passport.jwt.strategy';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { PostRepository } from 'src/post/post.repository';
import { ReplyLogRepository } from 'src/post/reply.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      PostRepository,
      ReplyLogRepository,
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRETKEY'),
        signOptions: { expiresIn: '3600s' },
      }),
    }),
    PassportModule,
  ],
  exports: [TypeOrmModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy],
})
export class AuthModule {}

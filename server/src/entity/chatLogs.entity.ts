import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class ChatLogs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rooms_id: number;

  @Column()
  nickname: string;

  @Column()
  chat: string;

  @CreateDateColumn()
  time: Date;
}

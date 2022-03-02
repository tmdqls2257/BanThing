import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Reply } from './reply.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  host_user_id: string;

  @Column()
  host_nickname: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  location_latitude: string;

  @Column()
  location_longitude: string;

  @Column()
  host_role: number;

  @Column()
  category: string;
}

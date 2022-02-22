import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column({ nullable: true })
  user_image: string;

  @Column({ nullable: true })
  auth: string;

  @Column({ nullable: true })
  rating_score: number;

  @Column({ nullable: true })
  rating_count: number;
}

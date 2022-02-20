import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Rooms {
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

  @Column({ nullable: true })
  host_rating_score: number;

  @Column({ nullable: true })
  host_rating_count: number;
}

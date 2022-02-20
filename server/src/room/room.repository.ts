import { EntityRepository, Repository } from 'typeorm';
import { Rooms } from '../entity/rooms.entity';

@EntityRepository(Rooms)
export class RoomRepository extends Repository<Rooms> {}

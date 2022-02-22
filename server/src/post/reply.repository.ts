import { EntityRepository, Repository } from 'typeorm';
import { Reply } from '../entity/reply.entity';

@EntityRepository(Reply)
export class ChatLogRepository extends Repository<Reply> {}

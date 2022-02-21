import { EntityRepository, Repository } from 'typeorm';
import { ChatLogs } from '../entity/chatLogs.entity';

@EntityRepository(ChatLogs)
export class ChatLogRepository extends Repository<ChatLogs> {}

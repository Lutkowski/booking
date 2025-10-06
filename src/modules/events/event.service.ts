import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(EventEntity)
        private readonly eventRepo: Repository<EventEntity>,
    ) {}

    async create(dto: CreateEventDto): Promise<EventEntity> {
        const event = this.eventRepo.create(dto);
        return this.eventRepo.save(event);
    }

    async findAll(): Promise<EventEntity[]> {
        return this.eventRepo.find();
    }
}

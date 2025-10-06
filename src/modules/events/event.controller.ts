import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { EventEntity } from './event.entity';

@ApiTags('Events')
@Controller('api/events')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Post()
    @ApiResponse({ status: 201, type: EventEntity })
    async create(@Body() dto: CreateEventDto): Promise<EventEntity> {
        return this.eventService.create(dto);
    }

    @Get()
    @ApiResponse({ status: 200, type: [EventEntity] })
    async findAll(): Promise<EventEntity[]> {
        return this.eventService.findAll();
    }
}

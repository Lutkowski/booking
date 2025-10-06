import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { BookingEntity } from './booking.entity';
import { EventEntity } from '../events/event.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
    constructor(
        @InjectRepository(BookingEntity)
        private readonly bookingRepo: Repository<BookingEntity>,
        @InjectRepository(EventEntity)
        private readonly eventRepo: Repository<EventEntity>,
    ) {}

    @Transactional()
    async reserve(dto: CreateBookingDto) {
        const event = await this.eventRepo.findOne({
            where: { id: dto.event_id },
            lock: { mode: 'pessimistic_write' },
        });
        if (!event) throw new NotFoundException('Мероприятие не найдено');

        const already = await this.bookingRepo
            .createQueryBuilder('b')
            .where('b.user_id = :user_id AND b.event_id = :event_id', {
                user_id: dto.user_id,
                event_id: dto.event_id,
            })
            .getExists();
        if (already) throw new ConflictException('Пользователь уже бронировал место на это мероприятие');

        const current = await this.bookingRepo
            .createQueryBuilder('b')
            .where('b.event_id = :event_id', { event_id: dto.event_id })
            .getCount();
        if (current >= event.total_seats) throw new ConflictException('Все места заняты');

        const booking = this.bookingRepo.create({
            user_id: dto.user_id,
            event: { id: dto.event_id } as EventEntity,
        });
        await this.bookingRepo.save(booking);

        return {
            status: 'ok',
            booking: { id: booking.id, event_id: dto.event_id, user_id: dto.user_id },
        };
    }
}

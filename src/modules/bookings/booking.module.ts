import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from './booking.entity';
import {EventsModule} from '../events/event.module';

@Module({
    imports: [TypeOrmModule.forFeature([BookingEntity]), EventsModule],
})
export class BookingsModule {}

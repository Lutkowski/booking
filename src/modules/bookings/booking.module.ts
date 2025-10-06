import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from './booking.entity';
import {EventsModule} from '../events/event.module';
import {BookingsController} from './booking.controller';
import {BookingsService} from './booking.service';
import {EventEntity} from "../events/event.entity";

@Module({
    imports: [TypeOrmModule.forFeature([BookingEntity, EventEntity]), EventsModule],
    controllers: [BookingsController],
    providers: [BookingsService],

})
export class BookingsModule {}

import { Body, Controller, Post } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import {BookingsService} from './booking.service';

@Controller('api/bookings')
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) {}

    @Post('reserve')
    async reserve(@Body() dto: CreateBookingDto) {
        return this.bookingsService.reserve(dto);
    }
}

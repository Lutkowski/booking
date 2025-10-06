import { Body, Controller, Post } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import {BookingsService} from './booking.service';
import {ApiOperation, ApiResponse} from '@nestjs/swagger';

@Controller('api/bookings')
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) {}

    @Post('reserve')
    @ApiOperation({ summary: 'Забронировать место на мероприятие' })
    @ApiResponse({ status: 201, description: 'Место успешно забронировано' })
    @ApiResponse({ status: 409, description: 'Пользователь уже бронировал или мест нет' })
    async reserve(@Body() dto: CreateBookingDto) {
        return this.bookingsService.reserve(dto);
    }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateEventDto {
    @ApiProperty({
        example: 'Event',
    })
    @IsString()
    @MinLength(2, { message: 'Название должно содержать минимум 2 символа' })
    name: string;

    @ApiProperty({
        example: 100,
    })
    @IsInt()
    @IsPositive()
    total_seats: number;
}

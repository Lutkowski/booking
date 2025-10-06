import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateBookingDto {
    @ApiProperty({ example: 1, description: 'ID мероприятия' })
    @IsInt()
    @Min(1)
    event_id: number;

    @ApiProperty({ example: '42', description: 'Идентификатор пользователя' })
    @IsString()
    @IsNotEmpty()
    user_id: string;
}

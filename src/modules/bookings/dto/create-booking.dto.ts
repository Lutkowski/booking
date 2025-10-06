import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateBookingDto {
    @IsInt()
    @Min(1)
    event_id: number;

    @IsString()
    @IsNotEmpty()
    user_id: string;
}
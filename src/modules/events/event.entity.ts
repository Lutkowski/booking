import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {BookingEntity} from '../bookings/booking.entity';

@Entity('events')
export class EventEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'int', nullable: false })
    total_seats: number;

    @OneToMany(() => BookingEntity, (booking) => booking.event)
    bookings: BookingEntity[];
}

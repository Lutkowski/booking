import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
    JoinColumn,
} from 'typeorm';
import { EventEntity } from '../events/event.entity';

@Entity('bookings')
@Unique(['event', 'user_id'])
export class BookingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    user_id: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => EventEntity, (event) => event.bookings, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'event_id' })
    event: EventEntity;
}

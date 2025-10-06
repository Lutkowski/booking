import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TypeOrmConfigService} from "./common/configs/typeorm.config";
import {EventsModule} from "./modules/events/event.module";
import {BookingsModule} from "./modules/bookings/booking.module";

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
    }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useClass: TypeOrmConfigService,
        }),
    EventsModule,
    BookingsModule,
    ],
})
export class AppModule {
}

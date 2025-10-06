import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TypeOrmConfigService} from './common/configs/typeorm.config';
import {EventsModule} from './modules/events/event.module';
import {BookingsModule} from './modules/bookings/booking.module';
import {addTransactionalDataSource} from 'typeorm-transactional';
import {DataSource, DataSourceOptions} from 'typeorm';

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
    }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useClass: TypeOrmConfigService,
            // 👇 ВАЖНО: оборачиваем DataSource
            dataSourceFactory: async (options) => {
                if (!options) throw new Error('Invalid TypeORM options');
                return addTransactionalDataSource(new DataSource(options as DataSourceOptions));
            },
        }),
    EventsModule,
    BookingsModule,
    ],
})
export class AppModule {
}

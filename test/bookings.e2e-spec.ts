import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import request from 'supertest';
import {initializeTransactionalContext} from 'typeorm-transactional';

describe('Bookings e2e', () => {
    let app: INestApplication;

    beforeAll(async () => {
        initializeTransactionalContext();
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should create booking successfully', async () => {
        const res = await request(app.getHttpServer())
            .post('/api/bookings/reserve')
            .send({ event_id: 1, user_id: '1' })
            .expect(201);

        expect(res.body.status).toBe('ok');
        expect(res.body.booking).toHaveProperty('event_id', 1);
        expect(res.body.booking).toHaveProperty('user_id', '1');
    });

    it('should return 409 if booking already exists', async () => {
        await request(app.getHttpServer())
            .post('/api/bookings/reserve')
            .send({ event_id: 1, user_id: '2' })
            .expect(201);

        const duplicate = await request(app.getHttpServer())
            .post('/api/bookings/reserve')
            .send({ event_id: 1, user_id: '2' })
            .expect(409);

        expect(duplicate.body.message).toContain('Пользователь уже бронировал место на это мероприятие');
    });

    it('should return 404 if event does not exist', async () => {
        const res = await request(app.getHttpServer())
            .post('/api/bookings/reserve')
            .send({ event_id: 9999, user_id: '3' })
            .expect(404);

        expect(res.body.message).toContain('Мероприятие не найдено');
    });
});

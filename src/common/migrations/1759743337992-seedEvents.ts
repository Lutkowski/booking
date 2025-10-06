import { MigrationInterface, QueryRunner } from 'typeorm';

export class Bash1759743337992 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      INSERT INTO events (name, total_seats)
      SELECT v.name, v.total_seats
      FROM (VALUES
        ('Event 1', 5),
        ('Event 2', 10),
        ('Event 3', 30)
      ) AS v(name, total_seats)
      WHERE NOT EXISTS (
        SELECT 1 FROM events e WHERE e.name = v.name
      );
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      DELETE FROM events
      WHERE name IN ('Event 1', 'Event 2', 'Event 3');
    `);
    }
}

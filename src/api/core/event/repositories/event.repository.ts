import { Event, EventData } from '@/api/core/event/entities/event.entity';
import { Db } from '@/common/db/connect';

export class EventRepository {
	constructor() {}

	async create(eventData: EventData): Promise<Event> {
		const { rows } = await Db.query(
			`INSERT INTO events (
              "id",
              "title",
              "description",
              "startDate",
              "endDate",
              "location",
              "latitude",
              "longitude",
              "userId",
              "createdAt",
              "updatedAt"
            ) VALUES (
              $1, $2, $3, $4, $5, $6, $7, $8, $9,
              CURRENT_TIMESTAMP,
              CURRENT_TIMESTAMP
            ) RETURNING *`,
			[
				eventData.id,
				eventData.title,
				eventData.description,
				eventData.startDate,
				eventData.endDate,
				eventData.location,
				eventData.latitude,
				eventData.longitude,
				eventData.userId
			]
		);

		return new Event(rows[0]);
	}

	async findById(id: string): Promise<Event | null> {
		const { rows } = await Db.query(`SELECT * FROM events WHERE id = $1`, [id]);
		return rows.length ? new Event(rows[0]) : null;
	}

	async findAll(): Promise<Event[]> {
		const { rows } = await Db.query(`SELECT * FROM events`);
		return rows.map((row) => new Event(row));
	}

	async update(id: string, eventData: Partial<EventData>): Promise<Event | null> {
		const { rows } = await Db.query(
			`UPDATE events SET
              "title" = $1,
              "description" = $2,
              "startDate" = $3,
              "endDate" = $4,
              "location" = $5,
              "latitude" = $6,
              "longitude" = $7,
              "userId" = $8,
              "updatedAt" = CURRENT_TIMESTAMP
            WHERE "id" = $9
            RETURNING *`,
			[
				eventData.title,
				eventData.description,
				eventData.startDate,
				eventData.endDate,
				eventData.location,
				eventData.latitude,
				eventData.longitude,
				eventData.userId,
				id
			]
		);

		return rows.length ? new Event(rows[0]) : null;
	}

	async delete(id: string): Promise<void> {
		await Db.query(`DELETE FROM events WHERE id = $1`, [id]);
	}
}

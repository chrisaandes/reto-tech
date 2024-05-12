import { Db } from '@/common/db/connect';
import { Attendee, AttendeeData } from '../entities/attendee.entity';

export class AttendeeRepository {
  constructor() {}

  async create(attendeeData: AttendeeData): Promise<Attendee> {
    const { rows } = await Db.query(
      `INSERT INTO attendees (
        "id",
        "eventId",
        "userId",
        "createdAt",
        "updatedAt"
      ) VALUES (
        $1, $2, $3,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      ) RETURNING *`,
      [
        attendeeData.id,
        attendeeData.eventId,
        attendeeData.userId
      ]
    );

    return new Attendee(rows[0]);
  }

  async findById(id: string): Promise<Attendee | null> {
    const { rows } = await Db.query(
      `SELECT * FROM attendees WHERE "id" = $1`,
      [id]
    );

    return rows.length ? new Attendee(rows[0]) : null;
  }

  async findByEventId(eventId: string): Promise<Attendee[]> {
    const { rows } = await Db.query(
      `SELECT * FROM attendees WHERE "eventId" = $1`,
      [eventId]
    );

    return rows.map((row) => new Attendee(row));
  }

  async delete(id: string): Promise<void> {
    await Db.query(
      `DELETE FROM attendees WHERE "id" = $1`,
      [id]
    );
  }
}
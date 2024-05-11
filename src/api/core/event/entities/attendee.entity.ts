import { z } from 'zod';
import { AttendeeSchema } from '@/api/core/event/entities/schema/Attendee';

export type AttendeeData = z.infer<typeof AttendeeSchema>;

export class Attendee {
  private data: AttendeeData;

  constructor(data: Partial<AttendeeData>) {
    this.data = AttendeeSchema.parse(data);
  }

  // Getters
  get id(): string | undefined {
    return this.data.id;
  }

  get eventId(): string {
    return this.data.eventId;
  }

  get userId(): string {
    return this.data.userId;
  }

  get createdAt(): Date | undefined {
    return this.data.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.data.updatedAt;
  }

  // Setters
  set eventId(value: string) {
    this.data.eventId = value;
  }

  set userId(value: string) {
    this.data.userId = value;
  }
}
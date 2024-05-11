import { Attendee } from '@/api/core/event/entities/attendee.entity';

export interface IAttendeeService {
	createAttendee(eventData: Attendee): Promise<Attendee>;
}

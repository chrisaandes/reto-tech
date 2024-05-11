import { v4 as uuidv4 } from 'uuid';
import { AttendeeRepository } from '@/api/core/event/repositories/attendee.repository';
import { IAttendeeService } from '@/api/shared/types/IAttendeeService';
import { Attendee, AttendeeData } from '@/api/core/event/entities/attendee.entity';

export class AttendeeService implements IAttendeeService {
	constructor(private attendeeRepository: AttendeeRepository) {}

	async createAttendee(attendeeData: AttendeeData): Promise<Attendee> {
		const newAttendee: AttendeeData = {
			id: uuidv4(),
			...attendeeData,
			createdAt: new Date(),
			updatedAt: new Date()
		};
		return this.attendeeRepository.create(newAttendee);
	}

	
}

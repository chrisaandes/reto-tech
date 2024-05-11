import { v4 as uuidv4 } from 'uuid';
import { EventRepository } from '@/api/core/event/repositories/event.repository';
import { IEventService } from '@/api/shared/types/IEventService';
import { Event, EventData } from '@/api/core/event/entities/event.entity';

export class EventService implements IEventService {
	constructor(private eventRepository: EventRepository) {}

	async createEvent(eventData: EventData): Promise<Event> {
		const newEvent: EventData = {
			id: uuidv4(),
			...eventData,
			createdAt: new Date(),
			updatedAt: new Date()
		};
		return this.eventRepository.create(newEvent);
	}

	async getEventById(id: string): Promise<Event | null> {
		return this.eventRepository.findById(id);
	}

	async getAllEvents(): Promise<Event[]> {
		return this.eventRepository.findAll();
	}

	async updateEvent(id: string, eventData: Partial<EventData>): Promise<Event | null> {
		return this.eventRepository.update(id, eventData);
	}

	async deleteEvent(id: string): Promise<void> {
		return this.eventRepository.delete(id);
	}
}

import { EventData } from '@/api/core/event/entities/event.entity';

export interface IEventService {
	createEvent(eventData: EventData): Promise<EventData>;
	getEventById(id: string): Promise<EventData | null>;
	getAllEvents(): Promise<EventData[]>;
	updateEvent(id: string, eventData: EventData): Promise<EventData | null>;
	deleteEvent(id: string): Promise<void>;
}

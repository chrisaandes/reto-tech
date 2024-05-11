import { z } from 'zod';
import { EventSchema } from '@/api/core/event/entities/schema/Event';

export type EventData = z.infer<typeof EventSchema>;

export class Event {
	private data: EventData;

	constructor(data: Partial<EventData>) {
		this.data = EventSchema.parse(data);
	}

	// Getters
	get id(): string | undefined {
		return this.data.id;
	}
	get title(): string {
		return this.data.title;
	}
	get description(): string {
		return this.data.description;
	}
	get startDate(): string {
		return this.data.startDate;
	}
	get endDate(): string {
		return this.data.endDate;
	}
	get location(): string {
		return this.data.location;
	}
	get latitude(): string {
		return this.data.latitude;
	}
	get longitude(): string {
		return this.data.longitude;
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
	set title(value: string) {
		this.data.title = value;
	}
	set description(value: string) {
		this.data.description = value;
	}
	set startDate(value: Date) {
		this.data.startDate = value;
	}
	set endDate(value: Date) {
		this.data.endDate = value;
	}
	set location(value: string) {
		this.data.location = value;
	}
	set latitude(value: number) {
		this.data.latitude = value;
	}
	set longitude(value: number) {
		this.data.longitude = value;
	}
	set userId(value: string) {
		this.data.userId = value;
	}
}

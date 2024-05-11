import { Request, Response } from 'express';
import { IEventService } from '@/api/shared/types/IEventService';
import {  IAttendeeService } from '@/api/shared/types/IAttendeeService';
import { BaseController } from '@/api/shared/controllers/base.controller';

export class EventController extends BaseController {
	constructor(private eventService: IEventService, private attendeeService: IAttendeeService) {
		super();
	}

	public createEvent(req: Request, res: Response): void {
		this.sendResponse(req, res, this.eventService.createEvent(req.body));
	}

	public createEventAttendee(req: Request, res: Response): void {
		this.sendResponse(req, res, this.attendeeService.createAttendee(req.body));
	}

	public getEventById(req: Request, res: Response): void {
		this.sendResponse(req, res, this.eventService.getEventById(req.params.id));
	}

	public getAllEvents(req: Request, res: Response): void {
		this.sendResponse(req, res, this.eventService.getAllEvents());
	}

	public updateEvent(req: Request, res: Response): void {
		this.sendResponse(req, res, this.eventService.updateEvent(req.params.id, req.body));
	}

	public deleteEvent(req: Request, res: Response): void {
		this.sendResponse(req, res, this.eventService.deleteEvent(req.params.id));
	}
}

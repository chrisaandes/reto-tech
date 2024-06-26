import { Router } from 'express';
import { EventController } from '@/api/core/event/event.controller';
import { EventService } from '@/api/core/event/services/event.service';
import { AttendeeService } from '@/api/core/event/services/attendee.service';
import { EventRepository } from '@/api/core/event/repositories/event.repository';
import { AttendeeRepository } from '@/api/core/event/repositories/attendee.repository';
import { CreateEventDTO } from '@/api/core/event/dto/create-input.dto';
import { validateDTO } from '@/api/shared/middlewares/validateDto';

const eventRepository = new EventRepository();
const eventService = new EventService(eventRepository);

const attendeeRepository = new AttendeeRepository();
const attendeeService = new AttendeeService(attendeeRepository);

const eventController = new EventController(eventService, attendeeService);

export const eventModule: Router = (() => {
	const router = Router();

	//router.post('/events', validateDTO(CreateEventDTO), eventController.createEvent);
	router.post('/events', (req, res) => eventController.createEvent(req, res));
	router.post('/events/attendee', (req, res) => eventController.createEventAttendee(req, res));
	router.get('/events/:id', (req, res) => eventController.getEventById(req, res));
	router.get('/events', (req, res) => eventController.getAllEvents(req, res));
	router.put('/events/:id', (req, res) => eventController.updateEvent(req, res));
	router.delete('/events/:id', (req, res) => eventController.deleteEvent(req, res));

	return router;
})();

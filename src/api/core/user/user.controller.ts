import { Request, Response } from 'express';
import { IUserService } from '@/api/shared/types/IUserService';
import { BaseController } from '@/api/shared/controllers/base.controller';

export class UserController extends BaseController {
	constructor(private userService: IUserService) {
		super();
	}

	public login(req: Request, res: Response): void {
		this.sendResponse(req, res, this.userService.login(req.body.email, req.body.password));
	}

	public createUser(req: Request, res: Response): void {
		this.sendResponse(req, res, this.userService.createUser(req.body));
	}

	public getUserById(req: Request, res: Response): void {
		this.sendResponse(req, res, this.userService.getUserById(req.params.id));
	}

	public getAllUsers(req: Request, res: Response): void {
		this.sendResponse(req, res, this.userService.getAllUsers());
	}

	public updateUser(req: Request, res: Response): void {
		this.sendResponse(req, res, this.userService.updateUser(req.params.id, req.body));
	}

	public deleteUser(req: Request, res: Response): void {
		this.sendResponse(req, res, this.userService.deleteUser(req.params.id));
	}
}

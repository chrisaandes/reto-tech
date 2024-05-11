import { Router } from 'express';
import { UserController } from '@/api/core/user/user.controller';
import { UserService } from '@/api/core/user/services/user.service';
import { UserRepository } from '@/api/core/user/repositories/user.repository';
import { CreateUserDTO } from '@/api/core/user/dto/create-input.dto';
import { validateDTO } from '@/api/shared/middlewares/validateDto';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

export const userModule: Router = (() => {
	const router = Router();

	//router.post('/users', validateDTO(CreateUserDTO), userController.createUser);
	router.post('/login', (req, res) => userController.login(req, res));
	router.post('/users', (req, res) => userController.createUser(req, res));
	router.get('/users/:id', (req, res) => userController.getUserById(req, res));
	router.get('/users', (req, res) => userController.getAllUsers(req, res));
	router.put('/users/:id', (req, res) => userController.updateUser(req, res));
	router.delete('/users/:id', (req, res) => userController.deleteUser(req, res));

	return router;
})();

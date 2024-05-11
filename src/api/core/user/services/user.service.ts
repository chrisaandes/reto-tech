import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from '@/api/core/user/repositories/user.repository';
import { IUserService } from '@/api/shared/types/IUserService';
import { User, UserData, AuthUserData } from '@/api/core/user/entities/user.entity';
import { encryptPassword, comparePassword } from '@/common/utils/bcrypt';
import { generateToken } from '@/common/utils/tokenize/jwt';

export class UserService implements IUserService {
	constructor(private userRepository: UserRepository) {}

	async login(email: string, password: string): Promise<AuthUserData | null> {
		const user = await this.userRepository.findByEmail(email);
		if (!user) {
			return null;
		}
		const isMatch = await comparePassword(password, user.password);
		if (!isMatch) {
			return null;
		}

		const token = generateToken({ id: user.id, email: user.email });

		return {
			token,
			user
		};
	
	}

	async createUser(userData: UserData): Promise<User> {
		const newUser: UserData = {
			id: uuidv4(),
			...userData,
			password: await encryptPassword(userData.password),
			createdAt: new Date(),
			updatedAt: new Date()
		};
		return this.userRepository.create(newUser);
	}

	async getUserById(id: string): Promise<User | null> {
		return this.userRepository.findById(id);
	}

	async getAllUsers(): Promise<User[]> {
		return this.userRepository.findAll();
	}

	async updateUser(id: string, userData: Partial<UserData>): Promise<User | null> {
		return this.userRepository.update(id, userData);
	}

	async deleteUser(id: string): Promise<void> {
		return this.userRepository.delete(id);
	}
}

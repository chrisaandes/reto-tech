import { UserData, AuthUserData } from '@/api/core/user/entities/user.entity';

export interface IUserService {
	login(email: string, password: string): Promise<AuthUserData | null>;
	createUser(eventData: UserData): Promise<UserData>;
	getUserById(id: string): Promise<UserData | null>;
	getAllUsers(): Promise<UserData[]>;
	updateUser(id: string, eventData: UserData): Promise<UserData | null>;
	deleteUser(id: string): Promise<void>;
}

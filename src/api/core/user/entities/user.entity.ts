import { z } from 'zod';
import { UserSchema } from '@/api/core/user/entities/schema/User';

export type UserData = z.infer<typeof UserSchema>;

export type AuthUserData = {
	token: string;
	user: UserData;
};

export class User {
  private data: UserData;

  constructor(data: Partial<UserData>) {
    this.data = UserSchema.parse(data);
  }

  // Getters
  get id(): string | undefined {
    return this.data.id;
  }

  get name(): string {
    return this.data.name;
  }

  get email(): string {
    return this.data.email;
  }

  get password(): string {
    return this.data.password;
  }

  get phone(): string {
    return this.data.phone;
  }

  get role(): 'admin' | 'visitor' {
    return this.data.role;
  }

  get createdAt(): Date | undefined {
    return this.data.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.data.updatedAt;
  }

  // Setters
  set name(value: string) {
    this.data.name = value;
  }

  set email(value: string) {
    this.data.email = value;
  }

  set password(value: string) {
    this.data.password = value;
  }

  set phone(value: string) {
    this.data.phone = value;
  }

  set role(value: 'admin' | 'visitor') {
    this.data.role = value;
  }
}
import { User, UserData } from '@/api/core/user/entities/user.entity';
import { Db } from '@/common/db/connect';

export class UserRepository {
  constructor() {}

  async findByEmail(email: string): Promise<User | null> {
	const { rows } = await Db.query(`SELECT * FROM users WHERE "email" = $1`, [email]);
	return rows.length ? new User(rows[0]) : null;
  }

  async create(userData: UserData): Promise<User> {
    const { rows } = await Db.query(
      `INSERT INTO users (
        "id",
        "name",
        "email",
        "password",
        "phone",
        "role",
        "createdAt",
        "updatedAt"
      ) VALUES (
        $1, $2, $3, $4, $5, $6,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      ) RETURNING "id",
                  "name",
                  "email",
                  "phone",
                  "role",
                  "createdAt",
                  "updatedAt"`,
      [
        userData.id,
        userData.name,
        userData.email,
        userData.password,
        userData.phone,
        userData.role
      ]
    );
	
    return new User(rows[0]);
  }

  async findById(id: string): Promise<User | null> {
    const { rows } = await Db.query(`SELECT * FROM users WHERE "id" = $1`, [id]);
    return rows.length ? new User(rows[0]) : null;
  }

  async findAll(): Promise<User[]> {
    const { rows } = await Db.query(`SELECT * FROM users`);
    return rows.map((row) => new User(row));
  }

  async update(id: string, userData: Partial<UserData>): Promise<User | null> {
    const { rows } = await Db.query(
      `UPDATE users SET
        "name" = $1,
        "email" = $2,
        "password" = $3,
        "phone" = $4,
        "role" = $5,
        "updatedAt" = CURRENT_TIMESTAMP
      WHERE "id" = $6
      RETURNING *`,
      [
        userData.name,
        userData.email,
        userData.password,
        userData.phone,
        userData.role,
        id
      ]
    );

    return rows.length ? new User(rows[0]) : null;
  }

  async delete(id: string): Promise<void> {
    await Db.query(`DELETE FROM users WHERE "id" = $1`, [id]);
  }
}
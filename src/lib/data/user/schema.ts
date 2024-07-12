import { z } from 'zod';
import { User } from '@/config/db/schema';

export const userSchema = z.object({
  first_name: z.string().min(1, { message: 'First name is required' }),
  last_name: z.string().min(1, { message: 'Last name is required' }),
  password: z.string().min(6, 'Password too short - should be 6 chars minimum'),
  email: z.string().email({ message: 'Email is required or the email is valid' }),
});

export type CreateUser = Pick<User, 'email'> &
  Partial<Pick<User, 'first_name' | 'last_name' | 'role' | 'password'>>;

export type UpdateUser = Partial<CreateUser>;

import { DbClient } from '@/config/db/create-db-client';
import { User } from '@/config/db/schema';
import { CreateUser } from '../data/user/schema';

export interface IUser {
  id: string;
  created_at: string | Date;
  updated_at: string | Date;
  deleted_at: string | Date | null;
  first_name: string | null;
  last_name: string | null;
  password: string | null;
  email: string;
  role: string;
}

export interface IUserResult {
  records: IUser[];
  totalRecords: number;
}

export type GetUserDataArgs = {
  dbClient: DbClient;
  email: string;
};

export type GetUsersDataArgs = {
  dbClient: DbClient;
  limit?: number;
  page?: number;
  sortBy?: keyof User;
  orderBy?: 'asc' | 'desc';
  includeArchived?: boolean;
};

export type CreateUsersDataArgs = {
  dbClient: DbClient;
  values: CreateUser | CreateUser[];
};

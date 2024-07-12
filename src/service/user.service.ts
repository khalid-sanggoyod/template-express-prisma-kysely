import { Request, Response, NextFunction } from 'express';
import { createDbClient } from '@/config/db/create-db-client';
import { z } from 'zod';
import { User } from '@/lib/data/user/User';
import { GetUsersDataArgs } from '@/lib/interfaces/user.interface';
import { userSchema } from '@/lib/data/user/schema';

const dbClient = createDbClient();

export const getUsersSchema = {
  query: z.object({
    limit: z.coerce.number().optional(),
    page: z.coerce.number().optional(),
    sort_by: z.string().optional(),
    order_by: z.enum(['asc', 'desc']).optional(),
    include_archived: z
      .enum(['true', 'false'])
      .transform(v => v === 'true')
      .optional(),
  }),
  response: z.object({
    records: z.array(userSchema),
    total_records: z.number(),
  }),
};

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const query = getUsersSchema.query.parse(req.query);

    const data = await User.getUsersData({
      dbClient,
      sortBy: query?.sort_by as GetUsersDataArgs['sortBy'],
      orderBy: query?.order_by,
      limit: query?.limit,
      page: query?.page,
      includeArchived: query?.include_archived,
    });

    return res.json({
      success: true,
      message: 'Success',
      data: data,
    });
  } catch (error) {
    next(error);
  }
}

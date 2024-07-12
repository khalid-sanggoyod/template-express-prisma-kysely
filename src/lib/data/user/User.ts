import { DbClient } from '@/config/db/create-db-client';
import { GetUsersDataArgs, GetUserDataArgs } from '@/lib/interfaces/user.interface';
import { CreateUser } from './schema';

export class User {
  dbClient: DbClient;
  values: CreateUser | CreateUser[];

  constructor(dbClient: any, values: any) {
    this.dbClient = dbClient;
    this.values = values;
  }

  async createUsersData() {
    const createdRecords = await this.dbClient
      .insertInto('users')
      .values(this.values)
      .returningAll()
      .execute();

    return createdRecords;
  }

  static async getUsersData({
    dbClient,
    limit = 25,
    page = 1,
    sortBy = 'created_at',
    orderBy = 'desc',
    includeArchived,
  }: GetUsersDataArgs) {
    let query = dbClient
      .selectFrom('users')
      .selectAll()
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(sortBy, orderBy);

    let allRecordsQuery = dbClient
      .selectFrom('users')
      .select(dbClient.fn.count('id').as('total_records'));

    if (!includeArchived) {
      query = query.where('deleted_at', 'is', null);
      allRecordsQuery = allRecordsQuery.where('deleted_at', 'is', null);
    }

    const records = await query.execute();
    const allRecords = await allRecordsQuery.executeTakeFirst();

    return { records, totalRecords: Number(allRecords?.total_records ?? 0) };
  }

  static async getUserByEmailData({ dbClient, email }: GetUserDataArgs) {
    const record = await dbClient
      .selectFrom('users')
      .where('email', '=', email)
      .selectAll()
      .execute();

    return record;
  }
}

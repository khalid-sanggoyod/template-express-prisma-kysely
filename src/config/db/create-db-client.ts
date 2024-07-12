import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { type KyselySchema } from './schema';
import { config } from '..';

export function createDbClient() {
  const dbClient = new Kysely<KyselySchema>({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: `${config.DB_URL}`,
        max: 50, // Set maximum <number> of client(s) in the pool
        connectionTimeoutMillis: 1000, // return an error after <number> second(s) if connection could not be established
        idleTimeoutMillis: 0, // close idle clients after <number> second(s)
      }),
    }),
  });

  return dbClient;
}

export type DbClient = ReturnType<typeof createDbClient>;

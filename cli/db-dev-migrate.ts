import { config } from '@/config';
import { runApplyDbMigration } from './commands/run-apply-db-migration';
import logger from '../src/utils/logger';

function run() {
  const dbUrl = config.DB_URL;

  logger.info(`Running migration on CORE database with STAGE of`);
  runApplyDbMigration({ databaseUrl: dbUrl });
}

run();

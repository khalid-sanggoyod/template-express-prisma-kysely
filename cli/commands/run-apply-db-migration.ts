import { runCommand } from '../utils/run-command';
import logger from '../../src/utils/logger';

export function runApplyDbMigration({ databaseUrl }: { databaseUrl: string }) {
  process.env.DB_URL = databaseUrl;

  const migrateCommand = 'yarn prisma migrate dev';
  const { error: migrateError } = runCommand(migrateCommand);

  if (migrateError) {
    logger.error(`Error when running prisma migrate:\n`, migrateError);
    process.exit();
  }

  const generateCommand = 'yarn prisma generate';
  const { error: generateError } = runCommand(generateCommand);

  if (generateError) {
    logger.error(`Error when running prisma generate:\n`, generateError);
    process.exit();
  }
}

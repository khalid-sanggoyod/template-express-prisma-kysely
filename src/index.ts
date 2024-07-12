/**
 * Main application file
 */
import { config } from './config';
import { server } from './server';
import logger from './utils/logger';

const APP_PORT = config.APP_PORT ?? 5000;

server.listen(APP_PORT, async () => {
  logger.info(`The server is listening on port ${APP_PORT}`);
});

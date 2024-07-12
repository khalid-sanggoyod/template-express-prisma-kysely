import logger from 'pino';
import dayjs from 'dayjs';

// to colorize and to pretty the msg of logger
const transport = logger.transport({
  target: 'pino-pretty',
  options: { colorize: true },
});

// pino is to increase the performance of Node
const log = logger(
  {
    base: {
      pid: false,
    },
    timestamp: () => `,"time": "${dayjs().format()}"`,
  },
  transport
);

export default log;

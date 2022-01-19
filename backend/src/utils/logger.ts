import winston from 'winston';

const logLevel = 'debug';

const fileFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.metadata({ fillExcept: ['level', 'message', 'timestamp'] }),
  winston.format.json()
);
const winstonFileTransport = new winston.transports.File({
  level: logLevel,
  filename: 'log.log',
  maxsize: 200000000, // 200MB
  maxFiles: 1,
  tailable: true,
  format: fileFormat
});

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.metadata({ fillExcept: ['level', 'message', 'timestamp'] }),
  winston.format.printf(((info) => {
    const { metadata } = info;
    const messageStr = info.message !== undefined ? info.message : '';
    const metaStr = Object.keys(metadata).length !== 0 ? JSON.stringify(info.metadata) : '';
    const messageAndMetaStr = [messageStr, metaStr].filter((s) => s.length > 0).join(' ');

    return `${info.timestamp} - ${info.level} : ${messageAndMetaStr}`;
  }))
);
const winstonConsoleTransport = new winston.transports.Console({
  level: logLevel,
  format: consoleFormat
});

export const logger = winston.createLogger({
  level: logLevel,
  transports: [
    winstonFileTransport,
    winstonConsoleTransport
  ]
});

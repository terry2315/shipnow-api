import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { env } from './env.config.js';

const { combine, timestamp, printf, errors, colorize } = winston.format;

const levels = { fatal: 0, error: 1, warning: 2, info: 3, http: 4, debug: 5 };
const colors = { fatal: 'red bold', error: 'red', warning: 'yellow', info: 'green', http: 'magenta', debug: 'blue' };

winston.addColors(colors);

const logFormat = printf(({ level, message, timestamp, stack }) => {
    const content = stack || message;
    return `${timestamp} [${level}] ${content}`;
});

const consoleTransport = new winston.transports.Console({
    level: env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        logFormat
    )
});

const errorFileTransport = new DailyRotateFile({
    level: 'error',
    dirname: 'logs',
    filename: 'error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        logFormat
    )
});

export const logger = winston.createLogger({
    levels,
    level: env.NODE_ENV === 'production' ? 'info' : 'debug',
    transports: [consoleTransport, errorFileTransport],
    exitOnError: false
});

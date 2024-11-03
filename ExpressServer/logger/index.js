import winston from "winston";
import fs from 'fs';
import path from "path";
import DailyRotateFile from "winston-daily-rotate-file";


const logDir = 'logs';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const myLogger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or higher to `error.log`
        //   (i.e., error, fatal, but not other levels)
        //
        // new winston.transports.File({ filename: 'error.log', level: 'error' }),
        //
        // - Write all logs with importance level of `info` or higher to `combined.log`
        //   (i.e., fatal, error, warn, and info, but not trace)
        //
        // new winston.transports.File({ filename: 'combined.log' }),

        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.simple(),
                winston.format.colorize()
            )
        }),

        new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(logDir, 'response.log'), level: 'info' }),

        new DailyRotateFile({
            filename: path.join(logDir, 'response-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxFiles: '14d',
            maxSize: 20,
            level: 'info'
        })
    ],
});

export default myLogger;
import winston, { LoggerOptions, Logger } from 'winston'
import { SeqTransport } from '@datalust/winston-seq'

const { combine, json, errors, align, colorize, printf, timestamp } = winston.format

export interface ILogger {
    info: (message: unknown, ...meta: unknown[]) => void
    error: (message: unknown, ...meta: unknown[]) => void
    warn: (message: unknown, ...meta: unknown[]) => void
    debug: (message: unknown, ...meta: unknown[]) => void
    http: (message: unknown, ...meta: unknown[]) => void
}

export class AppLogger implements ILogger {
    private logger: Logger

    constructor() {
        const seqTransport = new SeqTransport({
            serverUrl: process.env.SEQ_SERVER_URL,
            apiKey: process.env.SEQ_API_KEY,
            onError: (e) => console.error(e),
            format: combine(
                timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
                json(),
                errors({ stack: true })
            )
        })

        const consoleTransport = new winston.transports.Console({
            level: process.env.LOG_LEVEL || 'info',
            format: combine(
                timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
                colorize({ all: true }),
                errors({ stack: true }),
                align(),
                printf((info) => `[${info.timestamp}] payload: ${JSON.stringify(info.message)} `)
            )
        })

        const fileTransport = new winston.transports.File({
            level: process.env.LOG_LEVEL || 'info',
            //fix this to use actual date
            filename: `pos-service-%DATE%`,
            format: combine(
                timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
                errors({ stack: true }),
                align(),
                printf((info) => `[${info.timestamp}] payload: ${JSON.stringify(info.message)} `)
            )
        })

        const loggerConfig: LoggerOptions = {
            level: process.env.LOG_LEVEL || 'info',
            transports: [seqTransport, consoleTransport, fileTransport],
            exceptionHandlers: [seqTransport, consoleTransport, fileTransport],
            rejectionHandlers: [seqTransport, consoleTransport, fileTransport]
        }

        this.logger = winston.createLogger(loggerConfig)
    }

    info(message: unknown, ...meta: unknown[]) {
        this.logger.info(message as string, ...meta)
    }
    error(message: unknown, ...meta: unknown[]) {
        this.logger.error(message as string, ...meta)
    }
    warn(message: unknown, ...meta: unknown[]) {
        this.logger.warn(message as string, ...meta)
    }
    debug(message: unknown, ...meta: unknown[]) {
        this.logger.debug(message as string, ...meta)
    }
    http(message: unknown, ...meta: unknown[]) {
        this.logger.http(message as string, ...meta)
    }
}

import winston, { LoggerOptions } from "winston";
import { SeqTransport } from "@datalust/winston-seq";

const { combine, json, errors, align, colorize, printf, timestamp } =
  winston.format;

const seqTransport = new SeqTransport({
  serverUrl: process.env.SEQ_SERVER_URL,
  apiKey: process.env.SEQ_API_KEY,
  onError: (e) => {
    console.error(e);
  },
  format: combine(
    timestamp({ format: "YYYY/MM/DD HH:mm:ss" }),
    json(),
    errors({ stack: true }),
  ),
});

const consoleTransport = new winston.transports.Console({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    timestamp({ format: "YYYY/MM/DD HH:mm:ss" }),
    colorize({ all: true }),
    errors({ stack: true }),
    align(),
    printf((info) => {
      return `[${info.timestamp}] payload: ${JSON.stringify(info.message)} `;
    }),
  ),
});

const fileTransport = new winston.transports.File({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    timestamp({ format: "YYYY/MM/DD HH:mm:ss" }),
    colorize({ all: true }),
    errors({ stack: true }),
    align(),
    printf((info) => {
      return `[${info.timestamp}] payload: ${JSON.stringify(info.message)} `;
    }),
  ),
    filename: `pos-service-%DATE%`,
});

const loggerConfig: LoggerOptions = {
  level: process.env.LOG_LEVEL || "info",
  transports: [seqTransport, consoleTransport, fileTransport],
  exceptionHandlers: [seqTransport, consoleTransport, fileTransport],
  rejectionHandlers: [seqTransport, consoleTransport, fileTransport],
};

const logger = winston.createLogger(loggerConfig);

export default logger;

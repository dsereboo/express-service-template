import { HTTPStatusCodes } from "./http";

export default class AppError extends Error {
    public statusCode: number
    public isOperational: boolean

    constructor(statusCode: HTTPStatusCodes, message: string, isOperational = true, stack = '') {
        super(message)
        ;((this.statusCode = statusCode), (this.isOperational = isOperational))
        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

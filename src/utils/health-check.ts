import { Request, Response } from 'express'

export const healthCheckHandler = (req: Request, res: Response) => {
    return res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    })
}

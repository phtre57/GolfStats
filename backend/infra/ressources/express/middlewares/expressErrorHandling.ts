import { NextFunction, Request, Response } from 'express'

import { AppError } from 'domain/exceptions'

export const expressErrorHandling = (req: Request, res: Response, next: NextFunction) => {
  try {
    next()
  } catch (err) {
    console.log('Error in resource: ', err)
    if (err instanceof AppError) {
      res.status(err.statusCode).send({
        message: err.message,
        code: err.name,
      })
    } else {
      res.status(500).send({
        message: 'Internal server error',
      })
    }
  }
}

import { NextFunction, Request, Response } from 'express'

import { AppError } from 'domain/exceptions'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const expressErrorHandling = (error: any, _req: Request, res: Response, next: NextFunction) => {
  console.log('##### ERRORS #####')
  console.log('Error in resource: ', error)
  if (error instanceof AppError) {
    res.status(error.statusCode).send({
      message: error.message,
      code: error.name,
    })
  } else {
    res.status(500).send({
      message: 'Internal server error',
    })
  }
}

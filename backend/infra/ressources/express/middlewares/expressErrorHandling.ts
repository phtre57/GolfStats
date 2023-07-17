import { Response } from 'express'

import { AppError } from 'domain/exceptions'

export const expressErrorHandling = (func: () => any, res: Response) => {
  try {
    func()
  } catch (error) {
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
}

import { Injector } from '@sailplane/injector'
import { NextFunction, Request, Response, Router } from 'express'

import { GamesService } from 'services/games'

const service = Injector.get(GamesService)!

export const GamesRouter = Router()

GamesRouter.get('/games', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // do something
    res.status(200).send({})
  } catch (err) {
    next(err)
  }
})

GamesRouter.post('/games', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await service.createGame()
    res.status(200).send({})
  } catch (err) {
    next(err)
  }
})

GamesRouter.get('/games/:gameId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gameId } = req.params
    // do something
    res.status(200).send({})
  } catch (err) {
    next(err)
  }
})

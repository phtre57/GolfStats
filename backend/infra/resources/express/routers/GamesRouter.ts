import { Injector } from '@sailplane/injector'
import { NextFunction, Request, Response, Router } from 'express'
import { create } from 'superstruct'

import { DateTime } from 'domain/datetime'
import { NewGame } from 'domain/games'
import { NewGameDto } from 'infra/resources/dtos'
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
    const data = create(req.body, NewGameDto)
    const game: NewGame = {
      ...data,
      Date: DateTime.fromISOString(data.Date),
    }
    const createdGame = await service.createGame(game)
    res.status(200).send({
      ...createdGame,
      Date: createdGame.Date.toISOString(),
    })
  } catch (err) {
    next(err)
  }
})

GamesRouter.get('/games/:gameId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const { gameId } = req.params
    // do something
    res.status(200).send({})
  } catch (err) {
    next(err)
  }
})

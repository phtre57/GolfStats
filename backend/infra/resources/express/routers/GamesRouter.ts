import { Injector } from '@sailplane/injector'
import { NextFunction, Request, Response, Router } from 'express'

import { DateTime } from 'domain/datetime'
import { NewGame, UpdateGame } from 'domain/games'
import { GetGameParamsDto, NewGameDto, UpdateGameDto, checkSchema } from 'infra/resources/dtos'
import { GamesService } from 'services/games'

const gamesService = Injector.get(GamesService)!

export const GamesRouter = Router()

const ownerId = '9da778a5-f4a7-4e39-83e6-ffca0c4f7cd4'

GamesRouter.get('/games', async (req: Request, res: Response, next: NextFunction) => {
  // TODO: check OwnerId and get it from token
  try {
    const games = await gamesService.getGames(ownerId)

    const dtos = games.map((game) => ({
      ...game,
      Date: game.Date.toISOString(),
    }))

    res.status(200).send({
      Items: dtos,
      Count: dtos.length,
    })
  } catch (err) {
    next(err)
  }
})

GamesRouter.post('/games', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = checkSchema(req.body, NewGameDto)
    const game: NewGame = {
      ...data,
      Date: DateTime.fromISOString(data.Date),
    }

    const createdGame = await gamesService.createGame(game)

    res.status(200).send({
      ...createdGame,
      Date: createdGame.Date.toISOString(),
    })
  } catch (err) {
    next(err)
  }
})

GamesRouter.put('/games/:gameId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = checkSchema(req.body, NewGameDto)
    const { gameId } = checkSchema(req.params, UpdateGameDto)
    const game: UpdateGame = {
      ...data,
      Id: gameId,
      Date: DateTime.fromISOString(data.Date),
    }

    const updatedGame = await gamesService.updateGame(game)

    res.status(200).send({
      ...updatedGame,
      Date: updatedGame.Date.toISOString(),
    })
  } catch (err) {
    next(err)
  }
})

GamesRouter.get('/games/:gameId', async (req: Request, res: Response, next: NextFunction) => {
  // TODO: check OwnerId
  try {
    const { gameId } = checkSchema(req.params, GetGameParamsDto)

    const game = await gamesService.getGame(ownerId, gameId)

    res.status(200).send({
      ...game,
      Date: game.Date.toISOString(),
    })
  } catch (err) {
    next(err)
  }
})

import { Injector } from '@sailplane/injector'
import { Logger } from '@sailplane/logger'
import { uuid } from 'uuidv4'

import { GolfCourseRepository } from 'domain/courses'
import { DateTime } from 'domain/datetime'
import { CouldNotCreateGameException, Game, GameNotFoundException, GamesRepository } from 'domain/games'
import { Statistics } from 'domain/stats'

import { KnexClient } from '../KnexClient'
import { TableNames } from '../TableNames'
import { PostgresGolfCourseRepository } from '../courses'

const logger = new Logger('PostgresGamesRepository')

export class PostgresGamesRepository implements GamesRepository {
  private client: KnexClient

  private golfCourseRepository: GolfCourseRepository

  constructor({ client, golfCourseRepository }: { client : KnexClient, golfCourseRepository: GolfCourseRepository }) {
    this.client = client
    this.golfCourseRepository = golfCourseRepository
  }

  async createGame(game: Game): Promise<Game> {
    try {
      await this.client.db
        .table(TableNames.Games)
        .insert({
          Id: game.Id,
          Date: game.Date.toISOString(),
          GolfCourseId: game.GolfCourse.Id,
          TeeId: game.Tee.Id,
          FIR: game.GameStats.FIR,
          GIR: game.GameStats.GIR,
          Scrambling: game.GameStats.Scrambling,
          IronLeft: game.GameStats.IronLeft,
          IronRight: game.GameStats.IronRight,
          DrivingLeft: game.GameStats.DrivingLeft,
          DrivingRight: game.GameStats.DrivingRight,
          PuttingLowSide: game.GameStats.PuttingLowSide,
          PuttingHighSide: game.GameStats.PuttingHighSide,
          PuttingHit: game.GameStats.PuttingHit,
          PuttingShort: game.GameStats.PuttingShort,
          NumberOfPutts: game.GameStats.NumberOfPutts,
          FinalScore: game.GameStats.FinalScore,
        })

      const dbStats = game.Statistics.Statistics.map((stat) => ({
        Id: uuid(),
        GameId: game.Id,
        HoleNumber: stat.HoleNumber,
        Score: stat.Score,
        NumberOfPutts: stat.NumberOfPutts,
        DrivingAccuracy: stat.DrivingAccuracy,
        IronAccuracy: stat.IronAccuracy,
        PuttingAccuracy: stat.PuttingAccuracy,
        IsInSand: stat.IsInSand,
        NumberOfChips: stat.NumberOfChips,
        Penalties: stat.Penalties,
      }))

      await this.client.db
        .table(TableNames.Statistics)
        .insert(dbStats)

      return game
    } catch (e) {
      logger.info('Error with client when creating game', e)
      throw new CouldNotCreateGameException()
    }
  }

  async getGame(id: string): Promise<Game> {
    const rawGames = await this.client.db
      .select('*')
      .from(`${TableNames.Games} as game`)
      .join(`${TableNames.Statistics} as stat`, 'stat.GameId', 'game.Id')
      .where('Id', '=', id)

    logger.info('Raw games received: ', rawGames)

    if (rawGames.length < 1) {
      throw new GameNotFoundException(id)
    }

    const rawGame = rawGames[0]

    const course = await this.golfCourseRepository.getCourse(rawGame.Id)
    const tee = await this.golfCourseRepository.getTee(rawGame.TeeId)

    return new Game({
      ...rawGame,
      Date: DateTime.fromISOString(rawGame.Date),
      GolfCourse: course,
      Tee: tee,
      Statistics: new Statistics({
        Tee: tee,
        Statistics: rawGame.Statistics,
      }),
    })
  }

  async getGames(): Promise<Game[]> {
    throw new Error('Method not implemented.')
  }
}

const create = (): PostgresGamesRepository => {
  const client = Injector.get(KnexClient)!
  const golfCourseRepository = Injector.get(PostgresGolfCourseRepository)!
  return new PostgresGamesRepository({ client, golfCourseRepository })
}

Injector.register(PostgresGamesRepository, create)

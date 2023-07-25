import { Injector } from '@sailplane/injector'
import { Logger } from '@sailplane/logger'
import { uuid } from 'uuidv4'

import { GolfCourseRepository } from 'domain/courses'
import { DateTime } from 'domain/datetime'
import { CouldNotCreateGameException, Game, GameNotFoundException, GamesRepository, StatisticsNotFoundForGameException } from 'domain/games'
import { Statistic, Statistics } from 'domain/stats'

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

  async getStatsForGame(id: string): Promise<Statistic[]> {
    const rawStats = await this.client.db
      .select('*')
      .from(TableNames.Statistics)
      .where('GameId', '=', id)

    logger.info('Raw stats received: ', rawStats)

    if (rawStats.length < 1) {
      throw new StatisticsNotFoundForGameException(id)
    }

    return rawStats
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
          OwnerId: game.OwnerId,
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
      .from(`${TableNames.Games}`)
      .where('Id', '=', id)

    logger.info('Raw games received: ', rawGames)

    if (rawGames.length < 1) {
      throw new GameNotFoundException(id)
    }

    const rawGame = rawGames[0]

    const course = await this.golfCourseRepository.getCourse(rawGame.GolfCourseId)
    const tee = await this.golfCourseRepository.getTee(rawGame.TeeId)

    const stats = await this.getStatsForGame(rawGame.Id)

    return new Game({
      ...rawGame,
      Date: DateTime.fromISOString(rawGame.Date),
      GolfCourse: course,
      Tee: tee,
      Statistics: new Statistics({
        Tee: tee,
        Statistics: stats,
      }),
    })
  }

  async getGames(ownerId: string): Promise<Game[]> {
    const rawGames = await this.client.db
      .select('*')
      .from(`${TableNames.Games}`)
      .where('OwnerId', '=', ownerId)

    const gameIds = rawGames.map((game) => game.Id)

    return Promise.all(gameIds.map((id) => this.getGame(id)))
  }
}

const create = (): PostgresGamesRepository => {
  const client = Injector.get(KnexClient)!
  const golfCourseRepository = Injector.get(PostgresGolfCourseRepository)!
  return new PostgresGamesRepository({ client, golfCourseRepository })
}

Injector.register(PostgresGamesRepository, create)

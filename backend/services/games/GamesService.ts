import { Injector } from '@sailplane/injector'
import { uuid } from 'uuidv4'

import { GolfCourseRepository } from 'domain/courses'
import { Game, GamesRepository, NewGame } from 'domain/games'
import { Statistics } from 'domain/stats'
import { PostgresGamesRepository, PostgresGolfCourseRepository } from 'infra/repositories'

export interface IGamesService {
  golfCourseRepository: GolfCourseRepository
  gamesRepository: GamesRepository
}

export class GamesService {
  golfCourseRepository: GolfCourseRepository

  gamesRepository: GamesRepository

  constructor(params: IGamesService) {
    this.golfCourseRepository = params.golfCourseRepository
    this.gamesRepository = params.gamesRepository
  }

  async createGame(newGame: NewGame): Promise<void> {
    const golfCourse = await this.golfCourseRepository.getCourse(newGame.GolfCourseId)
    const tee = await this.golfCourseRepository.getTee(newGame.TeeId)
    const stats = new Statistics({
      Statistics: newGame.Statistics,
      Tee: tee,
    })
    const game = new Game({
      ...newGame,
      Id: uuid(),
      Tee: tee,
      GolfCourse: golfCourse,
      Statistics: stats,
    })
    await this.gamesRepository.createGame(game, game.Statistics.computeStats())
  }
}

const create = () => new GamesService({
  golfCourseRepository: Injector.get(PostgresGolfCourseRepository)!,
  gamesRepository: Injector.get(PostgresGamesRepository)!,
})

Injector.register(GamesService, create)

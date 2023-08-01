import { Injector } from '@sailplane/injector'
import { Logger } from '@sailplane/logger'

import { GolfCourseRepository } from 'domain/courses'
import { CouldNotCreateGameException, Game, GameNotFoundException, GamesRepository } from 'domain/games'

import { DynamoEntityName } from '../DynamoEntityName'
import { DynamoDbGolfCourseRepository } from '../courses'

import { GameEntity } from './GamesEntity'

const logger = new Logger('DynamoDbGamesRepository')

export class DynamoDbGamesRepository implements GamesRepository {
  gameEntity: GameEntity

  golfCourseRepository: GolfCourseRepository

  constructor(entity: GameEntity, golfCourseRepository: GolfCourseRepository) {
    this.gameEntity = entity
    this.golfCourseRepository = golfCourseRepository
  }

  async getFullGame(entity: any, courseId: string, teeId: string): Promise<Game> {
    const course = await this.golfCourseRepository.getCourse(courseId)
    const tee = await this.golfCourseRepository.getTee(courseId, teeId)

    return this.gameEntity.fromEntity(entity, course, tee)
  }

  async getGame(ownerId: string, id: string): Promise<Game> {
    const result = await this.gameEntity.entity.query(
      `${DynamoEntityName.Game}`,
      {
        beginsWith: `${ownerId}#${id}`,
      },
    )

    logger.info('getGame result', result)

    if (result.Items == null || result.Items.length < 1) {
      throw new GameNotFoundException(id)
    }

    const entity = result.Items[0]

    return this.getFullGame(entity, entity.GolfCourseId, entity.TeeId)
  }

  async getGames(ownerId: string): Promise<Game[]> {
    const result = await this.gameEntity.entity.query(
      `${DynamoEntityName.Game}`,
      {
        beginsWith: `${ownerId}#`,
      },
    )

    logger.info('getGames result', result)

    const items = result.Items || []

    return Promise.all(items.map(async (item) => this.getFullGame(item, item.GolfCourseId, item.TeeId)))
  }

  async createGame(game: Game): Promise<Game> {
    try {
      const entity = this.gameEntity.toEntity(game)
      await this.gameEntity.entity.put(entity)
      return game
    } catch (e) {
      logger.info('createGame error', e)
      throw new CouldNotCreateGameException()
    }
  }

  async updateGame(game: Game): Promise<Game> {
    try {
      const entity = this.gameEntity.toEntity(game)
      await this.gameEntity.entity.update(
        entity,
        {
          conditions: [
            {
              attr: 'SK',
              eq: `${game.OwnerId}#${game.Id}`,
            },
            {
              attr: 'Id',
              eq: game.Id,
            },
          ],
        },
      )

      return game
    } catch (e) {
      logger.info('updateGame error', e)
      throw new Error('')
    }
  }
}

Injector.register(DynamoDbGamesRepository, [GameEntity, DynamoDbGolfCourseRepository])

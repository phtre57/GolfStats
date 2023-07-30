import { Injector } from '@sailplane/injector'
import { Entity } from 'dynamodb-toolbox'

import { GolfCourse, Tee } from 'domain/courses'
import { DateTime } from 'domain/datetime'
import { Game } from 'domain/games'
import { Statistics } from 'domain/stats'

import { DynamoClient } from '../DynamoDBClient'
import { DynamoEntityName } from '../DynamoEntityName'
import { DynamoKeyName } from '../DynamoKeyName'

export class GameEntity {
  dynamoClient: DynamoClient

  entity: Entity

  constructor(dynamoClient: DynamoClient) {
    this.dynamoClient = dynamoClient
    this.entity = new Entity({
      name: 'Game',

      attributes: {
        PK: { partitionKey: true },
        SK: { sortKey: true },
        Id: { type: 'string', required: true },
        Date: { type: 'string', required: true },
        GolfCourseId: { type: 'string', required: true },
        TeeId: { type: 'string', required: true },
        OwnerId: { type: 'string', required: true },
        Statistics: { type: 'list' },
      },

      table: dynamoClient.mainTable,
    })
  }

  toEntity(game: Game) {
    return {
      [DynamoKeyName.PK]: `${DynamoEntityName.Game}`,
      [DynamoKeyName.SK]: `${game.OwnerId}#${game.Id}`,
      Id: game.Id,
      Date: game.Date.toISOString(),
      GolfCourseId: game.GolfCourse.Id,
      TeeId: game.Tee.Id,
      OwnerId: game.OwnerId,
      Statistics: game.Statistics.Statistics,
    }
  }

  fromEntity(entity: any, course: GolfCourse, tee: Tee): Game {
    const stats = new Statistics({
      Statistics: entity.Statistics,
      Tee: tee,
    })
    return new Game({
      Id: entity.Id,
      OwnerId: entity.OwnerId,
      Date: DateTime.fromISOString(entity.Date),
      GolfCourse: course,
      Statistics: stats,
      Tee: tee,
    })
  }
}

Injector.register(GameEntity, [DynamoClient])

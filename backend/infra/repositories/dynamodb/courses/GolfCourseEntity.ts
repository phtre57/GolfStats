import { Injector } from '@sailplane/injector'
import { Entity } from 'dynamodb-toolbox'

import { GolfCourse } from 'domain/courses'

import { DynamoClient } from '../DynamoDBClient'
import { DynamoEntityName } from '../DynamoEntityName'
import { DynamoKeyName } from '../DynamoKeyName'

export class GolfCourseEntity {
  dynamoClient: DynamoClient

  entity: Entity

  constructor(dynamoClient: DynamoClient) {
    this.dynamoClient = dynamoClient
    this.entity = new Entity({
      name: 'GolfCourse',

      attributes: {
        PK: { partitionKey: true },
        SK: { sortKey: true },
        Id: { type: 'string', required: true },
        Name: { type: 'string', required: true },
        Tees: { type: 'list' },
      },

      table: dynamoClient.mainTable,
    })
  }

  toEntity(course: GolfCourse) {
    return {
      [DynamoKeyName.PK]: `${DynamoEntityName.GolfCourse}`,
      [DynamoKeyName.SK]: `${course.Id}`,
      Id: course.Id,
      Name: course.Name,
      Tees: course.Tees,
    }
  }

  fromEntity(entity: any): GolfCourse {
    return {
      Id: entity.Id,
      Name: entity.Name,
      Tees: entity.Tees,
    }
  }
}

Injector.register(GolfCourseEntity, [DynamoClient])

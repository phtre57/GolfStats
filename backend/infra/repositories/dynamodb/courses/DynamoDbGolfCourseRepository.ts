import { Injector } from '@sailplane/injector'
import { Logger } from '@sailplane/logger'

import { GolfCourse, GolfCourseRepository, PartialGolfCourse, Tee } from 'domain/courses'
import { GolfCourseNotFoundException, TeeNotFoundException } from 'domain/courses/repositories/exceptions'

import { DynamoEntityName } from '../DynamoEntityName'

import { GolfCourseEntity } from './GolfCourseEntity'

const logger = new Logger('DynamoDbGolfCourseRepository')

export class DynamoDbGolfCourseRepository implements GolfCourseRepository {
  golfCourseEntity: GolfCourseEntity

  constructor(entity: GolfCourseEntity) {
    this.golfCourseEntity = entity
  }

  async getCourse(id: string): Promise<GolfCourse> {
    const result = await this.golfCourseEntity.entity.query(
      `${DynamoEntityName.GolfCourse}`,
      {
        beginsWith: `${id}`,
      },
    )

    logger.info('getCourse result:', result)

    if (result.Items == null || result.Items?.length < 1) {
      throw new GolfCourseNotFoundException(id)
    }

    return this.golfCourseEntity.fromEntity(result.Items?.[0])
  }

  async getCourses(): Promise<PartialGolfCourse[]> {
    const result = await this.golfCourseEntity.entity.query(
      `${DynamoEntityName.GolfCourse}`,
    )

    logger.info('getCourses result:', result)

    const courses = result.Items?.map((entity) => this.golfCourseEntity.fromEntity(entity)) || []
    return courses
  }

  async getTee(courseId: string, teeId: string): Promise<Tee> {
    const course = await this.getCourse(courseId)
    const foundTee = course.Tees.find((tee) => tee.Id === teeId)

    if (foundTee == null) {
      throw new TeeNotFoundException(teeId)
    }

    return foundTee
  }

  async createCourse(course: GolfCourse): Promise<GolfCourse> {
    const entity = this.golfCourseEntity.toEntity(course)
    await this.golfCourseEntity.entity.put(entity)
    return course
  }
}

Injector.register(DynamoDbGolfCourseRepository, [GolfCourseEntity])

import { Injector } from '@sailplane/injector'

import { GolfCourse, GolfCourseRepository, PartialGolfCourse } from 'domain/courses'
import { DynamoDbGolfCourseRepository } from 'infra/repositories/dynamodb'

export class GolfCourseService {
  private golfCourseRepository: GolfCourseRepository

  constructor({ golfCourseRepository }: { golfCourseRepository: GolfCourseRepository }) {
    this.golfCourseRepository = golfCourseRepository
  }

  async createCourse(course: GolfCourse): Promise<GolfCourse> {
    return this.golfCourseRepository.createCourse(course)
  }

  async getCourse(id: string): Promise<GolfCourse> {
    return this.golfCourseRepository.getCourse(id)
  }

  async getCourses(): Promise<PartialGolfCourse[]> {
    return this.golfCourseRepository.getCourses()
  }
}

const create = (): GolfCourseService => {
  const golfCourseRepository = Injector.get(DynamoDbGolfCourseRepository)!
  return new GolfCourseService({ golfCourseRepository })
}

Injector.register(GolfCourseService, create)

import { Injector } from '@sailplane/injector'

import { GolfCourse, GolfCourseRepository, PartialGolfCourse } from 'domain/courses'
import { GolfCourseNotFoundException } from 'domain/courses/repositories/exceptions/GolfCourseNotFoundException'

import { KnexClient } from '../KnexClient'
import { TableNames } from '../TableNames'

export class PostgresGolfCourseRepository implements GolfCourseRepository {
  private client: KnexClient

  constructor({ client }: { client : KnexClient }) {
    this.client = client
  }

  async getCourse(id: string): Promise<GolfCourse> {
    const course = await this.client.db
      .select<PartialGolfCourse[]>('*')
      .from(TableNames.GolfCourses)
      .where('Id', '=', id)

    if (course.length < 1) {
      throw new GolfCourseNotFoundException(id)
    }

    const tees = await this.client.db
      .select('*')
      .from(`${TableNames.GolfCourses} as course`)
      .join(`${TableNames.Tees} as tee`, 'tee.GolfCourseId', 'course.Id')
      .join(`${TableNames.Holes} as holes`, 'holes.TeeId', 'tee.Id')
      .where('course.Id', '=', id)

    return {
      ...course[0],
      Tees: tees,
    }
  }

  async getCourses(): Promise<PartialGolfCourse[]> {
    return this.client.db
      .select<PartialGolfCourse[]>('*')
      .from(TableNames.GolfCourses)
  }
}

const create = (): PostgresGolfCourseRepository => {
  const client = Injector.get(KnexClient)!
  return new PostgresGolfCourseRepository({ client })
}

Injector.register(PostgresGolfCourseRepository, create)

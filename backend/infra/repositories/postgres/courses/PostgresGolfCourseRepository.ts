import { Injector } from '@sailplane/injector'

import { GolfCourse, GolfCourseRepository, PartialGolfCourse, Tee } from 'domain/courses'
import { TeeNotFoundException } from 'domain/courses/repositories/exceptions'
import { GolfCourseNotFoundException } from 'domain/courses/repositories/exceptions/GolfCourseNotFoundException'

import { KnexClient } from '../KnexClient'
import { TableNames } from '../TableNames'

export class PostgresGolfCourseRepository implements GolfCourseRepository {
  private client: KnexClient

  constructor({ client }: { client : KnexClient }) {
    this.client = client
  }

  async getTee(id: string): Promise<Tee> {
    const tees = await this.client.db
      .select('*')
      .from(TableNames.Tees)
      .where('Id', '=', id)

    if (tees.length < 1) {
      throw new TeeNotFoundException(id)
    }

    return tees[0]
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

import { Injector } from '@sailplane/injector'
import { Knex } from 'knex'

import { GolfCourse, GolfCourseRepository, PartialGolfCourse } from 'domain/courses'
import { GolfCourseNotFoundException } from 'domain/courses/repositories/exceptions/GolfCourseNotFoundException'

import { TableNames } from '../TableNames'

export class PostgresGolfCourseRepository implements GolfCourseRepository {
  private client: Knex

  constructor({ client }: { client : Knex }) {
    this.client = client
  }

  async getCourse(id: string): Promise<GolfCourse> {
    const course = await this.client
      .select<PartialGolfCourse[]>('*')
      .from(TableNames.GolfCourses)
      .where('Id', '=', id)

    if (course.length < 1) {
      throw new GolfCourseNotFoundException(id)
    }

    const tees = await this.client
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
    return this.client
      .select<PartialGolfCourse[]>('*')
      .from(TableNames.GolfCourses)
  }
}

const create = (): PostgresGolfCourseRepository => {
  const client = Injector.getByName<Knex>('Knex')!
  return new PostgresGolfCourseRepository({ client })
}

Injector.register(PostgresGolfCourseRepository, create)

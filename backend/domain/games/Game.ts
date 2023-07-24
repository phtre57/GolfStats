import { DateTime } from 'domain/datetime'

import { GolfCourse, Statistic, Statistics, Tee } from '..'

export interface IGame {
  Id: string
  Date: DateTime
  GolfCourse: GolfCourse
  Tee: Tee
  Statistics: Statistics
  OwnerId: string
}

export interface NewGame {
  Date: DateTime
  GolfCourseId: string
  TeeId: string
  Statistics: Statistic[]
  OwnerId: string
}

export class Game {
  Id: string

  Date: DateTime

  GolfCourse: GolfCourse

  Tee: Tee

  Statistics: Statistics

  OwnerId: string

  constructor(params: IGame) {
    this.Id = params.Id
    this.Date = params.Date
    this.GolfCourse = params.GolfCourse
    this.Tee = params.Tee
    this.Statistics = params.Statistics
    this.OwnerId = params.OwnerId
  }
}

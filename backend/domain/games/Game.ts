import { DateTime } from 'domain/datetime'

import { ComputedStatistics, GolfCourse, Statistic, Statistics, Tee } from '..'

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

export interface UpdateGame extends NewGame {
  Id: string
}

export class Game {
  Id: string

  Date: DateTime

  GolfCourse: GolfCourse

  Tee: Tee

  Statistics: Statistics

  OwnerId: string

  GameStats: ComputedStatistics

  constructor(params: IGame) {
    this.Id = params.Id
    this.Date = params.Date
    this.GolfCourse = params.GolfCourse
    this.Tee = params.Tee
    this.Statistics = params.Statistics
    this.OwnerId = params.OwnerId
    this.GameStats = params.Statistics.computeStats()
  }
}

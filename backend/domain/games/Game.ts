import { DateTime } from 'domain/datetime'

import { GolfCourse, Statistics, Tee } from '..'

export interface IGame {
  Id: string
  Date: DateTime
  GolfCourse: GolfCourse
  Tee: Tee
  Statistics: Statistics
}

export class Game {
  Id: string

  Date: DateTime

  GolfCourse: GolfCourse

  Tee: Tee

  Statistics: Statistics

  constructor(params: IGame) {
    this.Id = params.Id
    this.Date = params.Date
    this.GolfCourse = params.GolfCourse
    this.Tee = params.Tee
    this.Statistics = params.Statistics
  }
}

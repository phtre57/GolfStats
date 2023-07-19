import { LongGameAccuracy } from './LongGameAccuracy'
import { Penalties } from './Penalties'
import { PuttingAccuracy } from './PuttingAccuracy'

export interface IStatistic {
  Score: number
  NumberOfPutts: number
  HoleNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18
  DrivingAccuracy?: LongGameAccuracy
  IronAccuracy?: LongGameAccuracy
  PuttingAccuracy?: PuttingAccuracy[]
  IsInSand?: boolean
  NumberOfChips?: number
  Penalties?: Penalties[]
}

export class Statistic {
  Score: number

  NumberOfPutts: number

  HoleNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18

  DrivingAccuracy?: LongGameAccuracy

  IronAccuracy?: LongGameAccuracy

  PuttingAccuracy?: PuttingAccuracy[]

  IsInSand?: boolean

  NumberOfChips?: number

  Penalties?: Penalties[]

  constructor(params: IStatistic) {
    this.Score = params.Score
    this.DrivingAccuracy = params.DrivingAccuracy
    this.HoleNumber = params.HoleNumber
    this.IronAccuracy = params.IronAccuracy
    this.NumberOfPutts = params.NumberOfPutts
    this.PuttingAccuracy = params.PuttingAccuracy
    this.IsInSand = params.IsInSand
    this.NumberOfChips = params.NumberOfChips
    this.Penalties = params.Penalties
  }
}

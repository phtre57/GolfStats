import { LongGameAccuracy } from './LongGameAccuracy'
import { Penalties } from './Penalties'
import { PuttingAccuracy } from './PuttingAccuracy'

export interface IStatistic {
  DrivingAccuracy: LongGameAccuracy
  IronAccuracy: LongGameAccuracy
  NumberOfPutts: number
  PuttingAccuracy: PuttingAccuracy[]
  IsInSand: boolean
  NumberOfChips: number
  Penalties: Penalties[]
}

export class Statistic {
  DrivingAccuracy: LongGameAccuracy

  IronAccuracy: LongGameAccuracy

  NumberOfPutts: number

  PuttingAccuracy: PuttingAccuracy[]

  IsInSand: boolean

  NumberOfChips: number

  Penalties: Penalties[]

  constructor(params: IStatistic) {
    this.DrivingAccuracy = params.DrivingAccuracy
    this.IronAccuracy = params.IronAccuracy
    this.NumberOfPutts = params.NumberOfPutts
    this.PuttingAccuracy = params.PuttingAccuracy
    this.IsInSand = params.IsInSand
    this.NumberOfChips = params.NumberOfChips
    this.Penalties = params.Penalties
  }
}

import { Hole, HoleDoesNotExistException, Tee } from '..'

import { ComputedStatistics } from './ComputedStatistics'
import { LongGameAccuracy } from './LongGameAccuracy'
import { PuttingAccuracy } from './PuttingAccuracy'
import { Statistic } from './Statistic'

export interface IStatistics {
  Statistics: Statistic[]
  Tee: Tee
}

export class Statistics {
  Statistics: Statistic[]

  Tee: Tee

  constructor(params: IStatistics) {
    this.Statistics = params.Statistics
    this.Tee = params.Tee
  }

  private hasPenalty(stat: Statistic): boolean {
    return Boolean(stat.Penalties && stat.Penalties.length > 0)
  }

  private getHolePlayed(stat: Statistic): Hole {
    const holePlayed = this.Tee[stat.HoleNumber]

    if (holePlayed == null) {
      throw new HoleDoesNotExistException(stat.HoleNumber, this.Tee.Id)
    }

    return holePlayed
  }

  private sumStatOf(key: keyof Statistic): number {
    return this.Statistics.reduce((acc, stat) => {
      if (stat[key] && typeof stat[key] === 'number') {
        const number = stat[key] as number
        return acc + number
      }

      return acc
    }, 0)
  }

  private computeAverageStatOf(key: keyof Statistic, value: any): number {
    const computedStats = this.Statistics.reduce((acc, stat) => {
      if (stat[key]) {
        if (stat[key] === value) {
          return {
            hits: acc.hits + 1,
            total: acc.total + 1,
          }
        }

        return {
          ...acc,
          total: acc.total + 1,
        }
      }

      return acc
    }, {
      total: 0,
      hits: 0,
    })

    if (computedStats.total === 0) {
      return 0
    }

    return computedStats.hits / computedStats.total
  }

  public computeGIR(): number {
    return this.computeAverageStatOf('IronAccuracy', LongGameAccuracy.Hit)
  }

  public computeIronRight(): number {
    return this.computeAverageStatOf('IronAccuracy', LongGameAccuracy.Right)
  }

  public computeIronLeft(): number {
    return this.computeAverageStatOf('IronAccuracy', LongGameAccuracy.Left)
  }

  public computeFIR(): number {
    return this.computeAverageStatOf('DrivingAccuracy', LongGameAccuracy.Hit)
  }

  public computeDrivingRight(): number {
    return this.computeAverageStatOf('DrivingAccuracy', LongGameAccuracy.Right)
  }

  public computeDrivingLeft(): number {
    return this.computeAverageStatOf('DrivingAccuracy', LongGameAccuracy.Left)
  }

  public computePuttingHit(): number {
    return this.computeAverageStatOf('PuttingAccuracy', PuttingAccuracy.Hit)
  }

  public computePuttingLowSide(): number {
    return this.computeAverageStatOf('PuttingAccuracy', PuttingAccuracy.LowSide)
  }

  public computePuttingHighSide(): number {
    return this.computeAverageStatOf('PuttingAccuracy', PuttingAccuracy.HighSide)
  }

  public computePuttingShort(): number {
    return this.computeAverageStatOf('PuttingAccuracy', PuttingAccuracy.Short)
  }

  public computeScrambling(): number {
    const scrambling = this.Statistics.reduce((acc, stat) => {
      const holePlayed = this.getHolePlayed(stat)
      const hasPenalty = this.hasPenalty(stat)

      if (!hasPenalty
        && stat.IronAccuracy
        && stat.NumberOfPutts <= 1
        && stat.IronAccuracy !== LongGameAccuracy.Hit
        && stat.Score <= holePlayed.Par) {
        return {
          ...acc,
          opportunities: acc.opportunities + 1,
          upAndDowns: acc.upAndDowns + 1,
        }
      }

      if (!hasPenalty
         && stat.IronAccuracy
         && stat.IronAccuracy !== LongGameAccuracy.Hit
         && stat.Score > holePlayed.Par) {
        return {
          ...acc,
          opportunities: acc.opportunities + 1,
        }
      }

      return acc
    }, {
      opportunities: 0,
      upAndDowns: 0,
    })

    if (scrambling.opportunities === 0) {
      return 0
    }

    return scrambling.upAndDowns / scrambling.opportunities
  }

  public computeStats(): ComputedStatistics {
    return {
      FIR: this.computeFIR(),
      GIR: this.computeGIR(),
      IronLeft: this.computeIronLeft(),
      IronRight: this.computeIronRight(),
      IronShort: this.computeAverageStatOf('IronAccuracy', LongGameAccuracy.Short),
      DrivingLeft: this.computeDrivingLeft(),
      DrivingRight: this.computeDrivingRight(),
      PuttingLowSide: this.computePuttingLowSide(),
      PuttingHighSide: this.computePuttingHighSide(),
      PuttingHit: this.computePuttingHit(),
      PuttingShort: this.computePuttingShort(),
      NumberOfPutts: this.sumStatOf('NumberOfPutts'),
      FinalScore: this.sumStatOf('Score'),
      Scrambling: this.computeScrambling(),
    }
  }
}

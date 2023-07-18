import { LongGameAccuracy } from './LongGameAccuracy'
import { Statistic } from './Statistic'

export interface IStatistics {
  Statistics: Statistic[]
}

export class Statistics {
  Statistics: Statistic[]

  constructor(params: IStatistics) {
    this.Statistics = params.Statistics
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

    return computedStats.hits / computedStats.total
  }

  public computeGIR(): number {
    return this.computeAverageStatOf('IronAccuracy', LongGameAccuracy.Hit)
  }
}

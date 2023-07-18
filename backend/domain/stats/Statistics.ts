import { Statistic } from './Statistic'

export interface IStatistics {
  Statistics: Statistic[]
}

export class Statistics {
  Statistics: Statistic[]

  constructor(params: IStatistics) {
    this.Statistics = params.Statistics
  }
}

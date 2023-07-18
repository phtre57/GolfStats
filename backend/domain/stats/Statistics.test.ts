import { LongGameAccuracy } from './LongGameAccuracy'
import { Statistics } from './Statistics'

describe('Statistics', () => {
  describe('computeGIR', () => {
    test('Given half green where Hit Then GIR is 0.5', () => {
      const stats = new Statistics({
        Statistics: [
          {
            Score: 4,
            IronAccuracy: LongGameAccuracy.Hit,
          },
          {
            Score: 4,
            IronAccuracy: LongGameAccuracy.Short,
          },
          {
            Score: 4,
            IronAccuracy: LongGameAccuracy.Hit,
          },
          {
            Score: 4,
            IronAccuracy: LongGameAccuracy.Right,
          },
          {
            Score: 4,
            IronAccuracy: LongGameAccuracy.Short,
          },
          {
            Score: 4,
            IronAccuracy: LongGameAccuracy.Hit,
          },
        ],
      })

      const actual = stats.computeGIR()

      expect(actual).toEqual(0.5)
    })
  })
})

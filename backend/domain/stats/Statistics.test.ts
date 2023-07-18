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

    test('Given half green hit and some iron not entered Then 0.5 GIR', () => {
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
          {
            Score: 4,
          },
          {
            Score: 4,
          },
        ],
      })

      const actual = stats.computeGIR()

      expect(actual).toEqual(0.5)
    })
  })

  describe('computeStats', () => {
    describe('Given raw stats', () => {
      test('Then all stats are computed', () => {
        const stats = new Statistics({
          Statistics: [
            {
              Score: 4,
              IronAccuracy: LongGameAccuracy.Hit,
              DrivingAccuracy: LongGameAccuracy.Hit,
            },
            {
              Score: 4,
              IronAccuracy: LongGameAccuracy.Right,
              DrivingAccuracy: LongGameAccuracy.Left,
            },
            {
              Score: 4,
              IronAccuracy: LongGameAccuracy.Left,
              DrivingAccuracy: LongGameAccuracy.Right,
            },
            {
              Score: 4,
              IronAccuracy: LongGameAccuracy.Short,
              DrivingAccuracy: LongGameAccuracy.Hit,
            },
            {
              Score: 4,
              IronAccuracy: LongGameAccuracy.Hit,
              DrivingAccuracy: LongGameAccuracy.Left,
            },
            {
              Score: 4,
              IronAccuracy: LongGameAccuracy.Hit,
              DrivingAccuracy: LongGameAccuracy.Hit,
            },
            {
              Score: 4,
              IronAccuracy: LongGameAccuracy.Short,
              DrivingAccuracy: LongGameAccuracy.Hit,
            },
            {
              Score: 4,
              IronAccuracy: LongGameAccuracy.Hit,
              DrivingAccuracy: LongGameAccuracy.Hit,
            },
          ],
        })

        const actual = stats.computeStats()

        expect(actual).toEqual({
          FIR: 0.625,
          GIR: 0.5,
          IronLeft: 0.125,
          IronRight: 0.125,
          DrivingLeft: 0.25,
          DrivingRight: 0.125,
        })
      })
    })
  })
})

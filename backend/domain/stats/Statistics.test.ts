import { Tee } from '..'

import { LongGameAccuracy } from './LongGameAccuracy'
import { Statistics } from './Statistics'

const createTee = (): Tee => ({
  Id: 'TeeId',
  Name: 'Black',
  1: {
    Distance: 400,
    Par: 4,
    Handicap: 3,
  },
  2: {
    Distance: 400,
    Par: 4,
    Handicap: 3,
  },
  3: {
    Distance: 400,
    Par: 4,
    Handicap: 3,
  },
  4: {
    Distance: 400,
    Par: 4,
    Handicap: 3,
  },
  5: {
    Distance: 400,
    Par: 4,
    Handicap: 3,
  },
  6: {
    Distance: 400,
    Par: 4,
    Handicap: 3,
  },
  7: {
    Distance: 400,
    Par: 4,
    Handicap: 3,
  },
  8: {
    Distance: 400,
    Par: 4,
    Handicap: 3,
  },
  9: {
    Distance: 400,
    Par: 4,
    Handicap: 3,
  },
  10: {
    Distance: 400,
    Par: 4,
    Handicap: 3,
  },
  11: {
    Distance: 400,
    Par: 4,
    Handicap: 3,
  },
  12: {
    Distance: 400,
    Par: 4,
    Handicap: 3,
  },
  13: {
    Distance: 400,
    Par: 4,
    Handicap: 3,
  },
  14: {
    Distance: 400,
    Par: 4,
    Handicap: 3,
  },
  15: {
    Distance: 400,
    Par: 4,
    Handicap: 3,
  },
  16: {
    Distance: 400,
    Par: 4,
    Handicap: 3,
  },
  17: {
    Distance: 400,
    Par: 4,
    Handicap: 3,
  },
  18: {
    Distance: 400,
    Par: 4,
    Handicap: 3,
  },
})

describe('Statistics', () => {
  describe('computeGIR', () => {
    test('Given half green where Hit Then GIR is 0.5', () => {
      const stats = new Statistics({
        Tee: createTee(),
        Statistics: [
          {
            Score: 4,
            IronAccuracy: LongGameAccuracy.Hit,
            NumberOfPutts: 2,
            HoleNumber: 1,
          },
          {
            Score: 4,
            IronAccuracy: LongGameAccuracy.Short,
            NumberOfPutts: 2,
            HoleNumber: 2,
          },
          {
            Score: 4,
            IronAccuracy: LongGameAccuracy.Hit,
            NumberOfPutts: 2,
            HoleNumber: 3,
          },
          {
            Score: 4,
            IronAccuracy: LongGameAccuracy.Right,
            NumberOfPutts: 2,
            HoleNumber: 4,
          },
          {
            Score: 4,
            IronAccuracy: LongGameAccuracy.Short,
            NumberOfPutts: 2,
            HoleNumber: 5,
          },
          {
            Score: 4,
            IronAccuracy: LongGameAccuracy.Hit,
            NumberOfPutts: 2,
            HoleNumber: 6,
          },
        ],
      })

      const actual = stats.computeGIR()

      expect(actual).toEqual(0.5)
    })

    test('Given half green hit and some iron not entered Then 0.5 GIR', () => {
      const stats = new Statistics({
        Tee: createTee(),
        Statistics: [
          {
            Score: 4,
            IronAccuracy: LongGameAccuracy.Hit,
            NumberOfPutts: 2,
            HoleNumber: 1,
          },
          {
            Score: 4,
            IronAccuracy: LongGameAccuracy.Short,
            NumberOfPutts: 2,
            HoleNumber: 2,
          },
          {
            Score: 4,
            IronAccuracy: LongGameAccuracy.Hit,
            NumberOfPutts: 2,
            HoleNumber: 3,
          },
          {
            Score: 4,
            IronAccuracy: LongGameAccuracy.Right,
            NumberOfPutts: 2,
            HoleNumber: 4,
          },
          {
            Score: 4,
            IronAccuracy: LongGameAccuracy.Short,
            NumberOfPutts: 2,
            HoleNumber: 5,
          },
          {
            Score: 4,
            IronAccuracy: LongGameAccuracy.Hit,
            NumberOfPutts: 2,
            HoleNumber: 6,
          },
          {
            Score: 4,
            NumberOfPutts: 2,
            HoleNumber: 7,
          },
          {
            Score: 4,
            NumberOfPutts: 2,
            HoleNumber: 8,
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
          Tee: createTee(),
          Statistics: [
            {
              Score: 4,
              IronAccuracy: LongGameAccuracy.Hit,
              DrivingAccuracy: LongGameAccuracy.Hit,
              NumberOfPutts: 2,
              HoleNumber: 1,
            },
            {
              Score: 4,
              IronAccuracy: LongGameAccuracy.Right,
              DrivingAccuracy: LongGameAccuracy.Left,
              NumberOfPutts: 1,
              HoleNumber: 2,
            },
            {
              Score: 3,
              IronAccuracy: LongGameAccuracy.Left,
              DrivingAccuracy: LongGameAccuracy.Right,
              NumberOfPutts: 0,
              HoleNumber: 3,
            },
            {
              Score: 5,
              IronAccuracy: LongGameAccuracy.Short,
              DrivingAccuracy: LongGameAccuracy.Hit,
              NumberOfPutts: 2,
              HoleNumber: 4,
            },
            {
              Score: 4,
              IronAccuracy: LongGameAccuracy.Hit,
              DrivingAccuracy: LongGameAccuracy.Left,
              NumberOfPutts: 2,
              HoleNumber: 5,
            },
            {
              Score: 5,
              IronAccuracy: LongGameAccuracy.Hit,
              DrivingAccuracy: LongGameAccuracy.Hit,
              NumberOfPutts: 3,
              HoleNumber: 6,
            },
            {
              Score: 5,
              IronAccuracy: LongGameAccuracy.Short,
              DrivingAccuracy: LongGameAccuracy.Hit,
              NumberOfPutts: 2,
              HoleNumber: 7,
            },
            {
              Score: 4,
              IronAccuracy: LongGameAccuracy.Hit,
              DrivingAccuracy: LongGameAccuracy.Hit,
              NumberOfPutts: 2,
              HoleNumber: 8,
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
          PuttingLowSide: 0,
          PuttingHighSide: 0,
          PuttingHit: 0,
          PuttingShort: 0,
          NumberOfPutts: 14,
          FinalScore: 34,
          Scrambling: 0.5,
        })
      })
    })
  })
})

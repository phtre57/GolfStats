import { Struct, array, boolean, min, number, object, refine, string } from 'superstruct'

import { HoleNumbers, LongGameAccuracy, PuttingAccuracy } from 'domain/stats'

import { DatetimeDto } from '../datetime'
import { between } from '../dtoUtils'
import { UUID } from '../uuid'

const longGameAccuracies = Object.values(LongGameAccuracy)
const puttingAccuracies = Object.values(PuttingAccuracy)

export const LongGameAccuracyDto = refine(
  string(),
  'LongGameAccuracyDto',
  (value) => longGameAccuracies.includes(value as LongGameAccuracy),
)

export const PuttingAccuracyDto = refine(
  string(),
  'PuttingAccuracyDto',
  (value) => puttingAccuracies.includes(value as PuttingAccuracy),
)

export const StatisticDto = object({
  Score: min(number(), 1),
  NumberOfPutts: min(number(), 1),
  HoleNumber: between(1, 18) as Struct<HoleNumbers>,
  DrivingAccuracy: LongGameAccuracyDto as Struct<LongGameAccuracy>,
  IronAccuracy: LongGameAccuracyDto as Struct<LongGameAccuracy>,
  PuttingAccuracy: array(PuttingAccuracyDto as Struct<PuttingAccuracy>),
  IsInSand: boolean(),
  NumberOfChips: min(number(), 1),
})

export const NewGameDto = object({
  Date: DatetimeDto,
  GolfCourseId: UUID,
  TeeId: UUID,
  OwnerId: UUID,
  Statistics: array(StatisticDto),
})

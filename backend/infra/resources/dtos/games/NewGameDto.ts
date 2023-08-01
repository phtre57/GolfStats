import { Struct, array, boolean, min, number, object, optional, refine, string } from 'superstruct'

import { HoleNumbers, LongGameAccuracy, Penalties, PuttingAccuracy } from 'domain/stats'

import { DatetimeDto } from '../datetime'
import { between } from '../dtoUtils'
import { UUID } from '../uuid'

const longGameAccuracies = Object.values(LongGameAccuracy)
const puttingAccuracies = Object.values(PuttingAccuracy)
const penalties = Object.values(Penalties)

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

export const PenaltiesDto = refine(
  string(),
  'PenaltiesDto',
  (value) => penalties.includes(value as Penalties),
)

export const StatisticDto = object({
  Score: min(number(), 1),
  NumberOfPutts: min(number(), 1),
  HoleNumber: between(1, 18) as Struct<HoleNumbers>,
  DrivingAccuracy: optional(LongGameAccuracyDto as Struct<LongGameAccuracy>),
  IronAccuracy: optional(LongGameAccuracyDto as Struct<LongGameAccuracy>),
  PuttingAccuracy: optional(array(PuttingAccuracyDto as Struct<PuttingAccuracy>)),
  IsInSand: optional(boolean()),
  NumberOfChips: optional(min(number(), 1)),
  Penalties: optional(array(PenaltiesDto as Struct<Penalties>)),
})

export const NewGameDto = object({
  Date: DatetimeDto,
  GolfCourseId: UUID,
  TeeId: UUID,
  OwnerId: UUID,
  Statistics: array(StatisticDto),
})

export const UpdateGameDto = object({
  gameId: UUID,
})

import { array, min, nonempty, number, object, optional, string } from 'superstruct'

export const HoleDto = object({
  Distance: min(number(), 0),
  Par: min(number(), 1),
  Handicap: number(),
})

export const CreateTeeDto = object({
  Name: nonempty(string()),
  1: optional(HoleDto),
  2: optional(HoleDto),
  3: optional(HoleDto),
  4: optional(HoleDto),
  5: optional(HoleDto),
  6: optional(HoleDto),
  7: optional(HoleDto),
  8: optional(HoleDto),
  9: optional(HoleDto),
  10: optional(HoleDto),
  11: optional(HoleDto),
  12: optional(HoleDto),
  13: optional(HoleDto),
  14: optional(HoleDto),
  15: optional(HoleDto),
  16: optional(HoleDto),
  17: optional(HoleDto),
  18: optional(HoleDto),
})

export const CreateGolfCourseDto = object({
  Name: nonempty(string()),
  Tees: array(CreateTeeDto),
})

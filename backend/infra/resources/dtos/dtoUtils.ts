import { number, refine } from 'superstruct'

export function between(minimum: number, maximum: number) {
  return refine(number(), 'between', (value) => value >= minimum && value <= maximum)
}

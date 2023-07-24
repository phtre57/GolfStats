import { number, refine } from 'superstruct'

export const between = (minimum: number, maximum: number) => refine(number(), 'between', (value) => value >= minimum && value <= maximum)

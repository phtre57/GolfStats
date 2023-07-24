import { define } from 'superstruct'
import { isUuid } from 'uuidv4'

export const UUID = define<string>('UUID', (value) => isUuid(value as string))

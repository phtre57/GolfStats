import { define } from 'superstruct'
import { isUuid } from 'uuidv4'

export const UUID = define('UUID', (value) => isUuid(value as string))

import { define } from 'superstruct'

import { DateTime } from 'domain/datetime'

export const DatetimeDto = define<string>('Datetime', (value) => DateTime.isISO8601DateTime(value as string))

import { Logger } from '@sailplane/logger'
import { Struct, create } from 'superstruct'

import { AppError } from 'domain/exceptions'

export class SchemaException extends AppError {
  constructor(e: any) {
    super(422, SchemaException.name, `Schema error: ${e}`)
  }
}

const logger = new Logger('checkSchema')

export function checkSchema<T>(data: any, schema: Struct<T>): T {
  try {
    return create(data, schema)
  } catch (e) {
    logger.info('Checking schema error: ', e)
    throw new SchemaException(e)
  }
}

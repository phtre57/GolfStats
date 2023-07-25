import { object } from 'superstruct'

import { UUID } from '../uuid'

export const GetGameParamsDto = object({
  gameId: UUID,
})

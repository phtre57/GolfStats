import { AppError } from 'domain/exceptions'

export class CouldNotUpdateGameException extends AppError {
  constructor(id: string) {
    super(400, CouldNotUpdateGameException.name, `Could not update game with id: ${id}`)
  }
}

import { AppError } from 'domain/exceptions'

export class CouldNotCreateGameException extends AppError {
  constructor() {
    super(400, CouldNotCreateGameException.name, 'Could not create game')
  }
}

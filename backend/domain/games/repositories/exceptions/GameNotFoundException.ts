import { AppError } from 'domain/exceptions'

export class GameNotFoundException extends AppError {
  constructor(id: string) {
    super(404, GameNotFoundException.name, `Game not found with id: ${id}`)
  }
}

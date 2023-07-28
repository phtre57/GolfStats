import { AppError } from 'domain/exceptions'

export class HoleDoesNotExistException extends AppError {
  constructor(holeNumber: number, teeId: string) {
    super(404, HoleDoesNotExistException.name, `Hole number not found: ${holeNumber} for tee with id: ${teeId}`)
  }
}

import { AppError } from 'domain/exceptions'

export class TeeNotFoundException extends AppError {
  constructor(id: string) {
    super(404, TeeNotFoundException.name, `Tee not found with id: ${id}`)
  }
}

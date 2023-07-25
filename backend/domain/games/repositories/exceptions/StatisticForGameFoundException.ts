import { AppError } from 'domain/exceptions'

export class StatisticsNotFoundForGameException extends AppError {
  constructor(id: string) {
    super(404, StatisticsNotFoundForGameException.name, `Statistics Not Found For Game With Id ${id}`)
  }
}

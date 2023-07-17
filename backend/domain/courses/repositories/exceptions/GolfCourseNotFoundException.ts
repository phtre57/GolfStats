import { AppError } from 'domain/exceptions'

export class GolfCourseNotFoundException extends AppError {
  constructor(id: string) {
    super(404, GolfCourseNotFoundException.name, `Golf Course not found with id: ${id}`)
  }
}

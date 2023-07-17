import { GolfCourse, PartialGolfCourse } from '../GolfCourse'

export interface GolfCourseRepository {
  getCourse(id: string): Promise<GolfCourse>

  getCourses(): Promise<PartialGolfCourse[]>
}

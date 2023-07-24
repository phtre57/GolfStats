import { GolfCourse, PartialGolfCourse } from '../GolfCourse'
import { Tee } from '../Tee'

export interface GolfCourseRepository {
  getCourse(id: string): Promise<GolfCourse>

  getCourses(): Promise<PartialGolfCourse[]>

  getTee(id: string): Promise<Tee>
}

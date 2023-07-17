import { Tee } from './Tee'

export interface PartialGolfCourse {
  Id: string
  Name: string
}

export interface GolfCourse extends PartialGolfCourse {
  Tees: Tee[]
}

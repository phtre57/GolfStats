import { Injector } from '@sailplane/injector'
import { NextFunction, Request, Response, Router } from 'express'

import { GolfCourseService } from 'services/courses'

export const GolfCoursesRouter = Router()

const golfCourseService = Injector.get(GolfCourseService)!

GolfCoursesRouter.get('/courses', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await golfCourseService.getCourses()
    res.status(200).send(courses)
  } catch (err) {
    next(err)
  }
})

GolfCoursesRouter.get('/courses/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courseId = req.params.id
    const course = await golfCourseService.getCourse(courseId)
    res.status(200).send(course)
  } catch (err) {
    next(err)
  }
})

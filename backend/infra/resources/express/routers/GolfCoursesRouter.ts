import { Injector } from '@sailplane/injector'
import { NextFunction, Request, Response, Router } from 'express'
import { uuid } from 'uuidv4'

import { GolfCourse } from 'domain/courses'
import { CreateGolfCourseDto, checkSchema } from 'infra/resources/dtos'
import { GolfCourseService } from 'services/courses'

export const GolfCoursesRouter = Router()

const golfCourseService = Injector.get(GolfCourseService)!

GolfCoursesRouter.post('/courses', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = checkSchema(req.body, CreateGolfCourseDto)
    const newCourse: GolfCourse = {
      ...dto,
      Id: uuid(),
      Tees: dto.Tees.map((tee) => ({
        ...tee,
        Id: uuid(),
      })),
    }
    const course = await golfCourseService.createCourse(newCourse)
    res.status(200).send(course)
  } catch (err) {
    next(err)
  }
})

GolfCoursesRouter.get('/courses', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await golfCourseService.getCourses()
    res.status(200).send(courses)
  } catch (err) {
    next(err)
  }
})

GolfCoursesRouter.get('/courses/:courseId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseId } = req.params
    const course = await golfCourseService.getCourse(courseId)
    res.status(200).send(course)
  } catch (err) {
    next(err)
  }
})

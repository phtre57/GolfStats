import { Injector } from '@sailplane/injector'
import express, { Express, NextFunction, Request, Response } from 'express'

import { expressErrorHandling } from 'infra'
import { GolfCourseService } from 'services'

const app: Express = express()
const port = 3001

const golfCourseService = Injector.get(GolfCourseService)!

app.use(express.json())

app.get('/health', (req: Request, res: Response) => {
  res.status(200).send({
    health: 'I am healthy!',
  })
})

app.get('/courses', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await golfCourseService.getCourses()
    res.status(200).send(courses)
  } catch (err) {
    next(err)
  }
})

app.get('/courses/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courseId = req.params.id
    const course = await golfCourseService.getCourse(courseId)
    res.status(200).send(course)
  } catch (err) {
    next(err)
  }
})

app.use(expressErrorHandling)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

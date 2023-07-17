import { Injector } from '@sailplane/injector'
import express, { Express, Request, Response } from 'express'

import { expressErrorHandling } from 'infra'
import { GolfCourseService } from 'services'

const app: Express = express()
const port = 3001

const golfCourseService = Injector.get(GolfCourseService)!

app.use(express.json())
app.use(expressErrorHandling)

app.get('/health', (req: Request, res: Response) => {
  res.status(200).send({
    health: 'I am healthy!',
  })
})

app.get('/courses', async (req: Request, res: Response) => {
  const courses = await golfCourseService.getCourses()
  res.status(200).send(courses)
})

app.get('/courses/:id', async (req: Request, res: Response) => {
  const courseId = req.params.id
  const course = await golfCourseService.getCourse(courseId)
  res.status(200).send(course)
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

import express, { Express, Request, Response } from 'express'
import { knex } from 'knex'

import { TableNames } from './infra'

const app: Express = express()
const port = 3001

const db = knex({
  client: 'pg',
  connection: {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    port: 5433,
    password: 'secret',
    ssl: false,
  },
})

app.use(express.json())

app.get('/health', (req: Request, res: Response) => {
  res.status(200).send({
    health: 'I am healthy!',
  })
})

app.get('/courses', async (req: Request, res: Response) => {
  const courses = await db.select('*').from(TableNames.GolfCourses)
  res.status(200).send(courses)
})

app.get('/courses/:id', async (req: Request, res: Response) => {
  const courseId = req.params.id
  const courses = await db.select('*').from(TableNames.GolfCourses)
  const tees = await db
    .select('*')
    .from(`${TableNames.GolfCourses} as course`)
    .join(`${TableNames.Tees} as tee`, 'tee.GolfCourseId', 'course.Id')
    .join(`${TableNames.Holes} as holes`, 'holes.TeeId', 'tee.Id')
    .where('course.Id', '=', courseId)
  res.status(200).send({
    ...courses[0],
    tees,
  })
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

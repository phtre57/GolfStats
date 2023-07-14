import express, { Express, Request, Response } from 'express'
import { knex } from 'knex'

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
  const courses = await db.table('GolfCourses').select()
  console.log(courses)
  res.status(200).send(courses)
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

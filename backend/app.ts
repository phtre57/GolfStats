import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 3001;

app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send({
    health: "I am healthy!",
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

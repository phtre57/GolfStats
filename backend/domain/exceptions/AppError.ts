export class AppError extends Error {
  statusCode: number

  name: string

  type: string

  values?: object

  expose: boolean

  constructor(statusCode: number, name: string, message: string, values?: object) {
    super(message)

    this.statusCode = statusCode
    this.name = name
    this.type = name
    this.values = values
    this.expose = statusCode < 500
  }
}

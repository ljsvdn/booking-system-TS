export default class HttpError extends Error {
  statusCode: number
  data: any

  constructor(statusCode: number = 500, msg: string, data?: any) {
    super(msg)
    this.statusCode = statusCode
    this.data = data
  }
}

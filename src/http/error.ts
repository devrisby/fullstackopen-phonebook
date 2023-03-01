export default class ApiError extends Error {
  status: number
  cause: string

  constructor(status: number, cause: string) {
    super(`${cause}`)
    this.name = 'ApiError'
    this.status = status
    this.cause = cause
  }
}

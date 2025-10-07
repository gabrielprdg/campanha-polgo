import { badRequest } from './components/bad-request'
import { serverError } from './components/server-error'
import { notFound } from './components/not-found'
import { noContent } from './components/no-content'
import { unauthorized } from './components/unauthorized'

export default {
  badRequest,
  serverError,
  notFound,
  noContent,
  unauthorized
}

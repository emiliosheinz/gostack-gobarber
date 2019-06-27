import { Router } from 'express'

import authMiddleware from './app/middlewares/auth'

import { UserController, SessionController } from './app/controllers'

const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)

routes.put('/users', UserController.update)

export default routes

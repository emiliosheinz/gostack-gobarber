import { Router } from 'express'
import multer from 'multer'

import multerConfig from './config/multer'

import authMiddleware from './app/middlewares/auth'

import {
  UserController,
  SessionController,
  FileController,
  ProviderController,
} from './app/controllers'

const routes = new Router()
const upload = multer(multerConfig)

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)

routes.put('/users', UserController.update)

routes.get('/providers', ProviderController.index)

routes.post('/files', upload.single('file'), FileController.store)

export default routes

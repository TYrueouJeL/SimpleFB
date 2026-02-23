/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/authController'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import ProjectController from '#controllers/projectController'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/login', [AuthController, 'login'])
router.post('/register', [AuthController, 'register'])
router.post('/logout', [AuthController, 'logout']).use(middleware.auth({ guards: ['api'] }))
router.get('/me', [AuthController, 'me']).use(middleware.auth({ guards: ['api'] }))

router.group(() => {
  router.get('/', [ProjectController, 'index'])
  router.post('/', [ProjectController, 'store'])
  router.get('/:projectSlug', [ProjectController, 'show'])
  router.put('/:projectSlug', [ProjectController, 'update'])
  router.delete('/:projectSlug', [ProjectController, 'delete'])

  router.group(() => {
    router.get('/', [ProjectController, 'index'])
    router.post('/', [ProjectController, 'store'])
    router.get('/:feedbackId', [ProjectController, 'show'])
    router.put('/:feedbackId', [ProjectController, 'update'])
    router.delete('/:feedbackId', [ProjectController, 'delete'])
  })
  .prefix('/feedback')
})
.prefix('/project').use(middleware.auth({ guards: ['api'] }))
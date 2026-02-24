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
import FeedbackController from '#controllers/feedbackController'

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
    router.get('/', [FeedbackController, 'index'])
    router.post('/', [FeedbackController, 'store'])
    router.get('/:feedbackId', [FeedbackController, 'show'])
    router.put('/:feedbackId', [FeedbackController, 'update'])
    router.delete('/:feedbackId', [FeedbackController, 'delete'])
  })
  .prefix('/:projectSlug/feedback')

  router.group(() => {
    router.post('/', [ProjectController, 'addUser'])
  })
  .prefix('/user')
})
.prefix('/project').use(middleware.auth({ guards: ['api'] }))
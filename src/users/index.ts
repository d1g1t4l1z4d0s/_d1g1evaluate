
import { Request, Response, Router } from 'express'
const router = Router()

router
  .post('/signup', (req: Request, res: Response) => {
    import('./users-controller')
      .then(async controller => {
        await controller.signup(req, res)
      })
      .catch(error => {
        const typedError = error as Error
        const message = typedError.message === '' ? 'Some was wrong with the users controller' : typedError.message
        res.status(500).json({ error: message })
      })
  })
  .post('/login', (req: Request, res: Response) => {
    import('./users-controller')
      .then(async controller => {
        await controller.login(req, res)
      })
      .catch(error => {
        const typedError = error as Error
        const message = typedError.message === '' ? 'Some was wrong with the users controller' : typedError.message
        res.status(500).json({ error: message })
      })
  })

export default router

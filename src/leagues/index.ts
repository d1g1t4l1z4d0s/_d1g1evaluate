import { Request, Response, Router } from 'express'
import TeamRouter from './team/.'
const router = Router()

router
  .get('/', (req: Request, res: Response) => {
    import('./leagues-controller')
      .then(async leagueController => {
        await leagueController.getLeagues(req, res)
      })
      .catch(error => {
        const typedError = error as Error
        const message = typedError.message === '' ? 'Some was wrong with the league controller' : typedError.message
        res.status(500).json({ error: message })
      })
  })
  .get('/:leagueId', (req: Request, res: Response) => {
    import('./leagues-controller')
      .then(async leagueController => {
        await leagueController.getLeague(req, res)
      })
      .catch(error => {
        const typedError = error as Error
        const message = typedError.message === '' ? 'Some was wrong with the league controller' : typedError.message
        res.status(500).json({ error: message })
      })
  })
  .post('/', (req: Request, res: Response) => {
    import('./leagues-controller')
      .then(async leagueController => {
        await leagueController.createLeague(req, res)
      })
      .catch(error => {
        const typedError = error as Error
        const message = typedError.message === '' ? 'Some was wrong with the league controller' : typedError.message
        res.status(500).json({ error: message })
      })
  })
  .patch('/:leagueId', (req: Request, res: Response) => {
    import('./leagues-controller')
      .then(async leagueController => {
        await leagueController.updateLeague(req, res)
      })
      .catch(error => {
        const typedError = error as Error
        const message = typedError.message === '' ? 'Some was wrong with the league controller' : typedError.message
        res.status(500).json({ error: message })
      })
  })
  .delete('/:leagueId', (req: Request, res: Response) => {
    import('./leagues-controller')
      .then(async leagueController => {
        await leagueController.deleteLeague(req, res)
      })
      .catch(error => {
        const typedError = error as Error
        const message = typedError.message === '' ? 'Some was wrong with the league controller' : typedError.message
        res.status(500).json({ error: message })
      })
  })
  .use('/teams', TeamRouter)

export default router

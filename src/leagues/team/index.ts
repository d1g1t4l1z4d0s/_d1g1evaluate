import { Request, Response, Router } from 'express'
const router = Router()

router
  .get('/:leagueId', (req: Request, res: Response) => {
    import('./team-controller')
      .then(async leagueController => {
        await leagueController.getTeam(req, res)
      })
      .catch(error => {
        const typedError = error as Error
        const message = typedError.message === '' ? 'Some was wrong with the team controller' : typedError.message
        res.status(500).json({ error: message })
      })
  })
  .post('/:leagueId', (req: Request, res: Response) => {
    import('./team-controller')
      .then(async leagueController => {
        await leagueController.createTeam(req, res)
      })
      .catch(error => {
        const typedError = error as Error
        const message = typedError.message === '' ? 'Some was wrong with the team controller' : typedError.message
        res.status(500).json({ error: message })
      })
  })
  .patch('/:leagueId', (req: Request, res: Response) => {
    import('./team-controller')
      .then(async leagueController => {
        await leagueController.updateTeam(req, res)
      })
      .catch(error => {
        const typedError = error as Error
        const message = typedError.message === '' ? 'Some was wrong with the team controller' : typedError.message
        res.status(500).json({ error: message })
      })
  })
  .delete('/:leagueId', (req: Request, res: Response) => {
    import('./team-controller')
      .then(async leagueController => {
        await leagueController.deleteTeam(req, res)
      })
      .catch(error => {
        const typedError = error as Error
        const message = typedError.message === '' ? 'Some was wrong with the team controller' : typedError.message
        res.status(500).json({ error: message })
      })
  })

export default router

import { Request, Response } from 'express'
import Leagues from '../leagues-model'
import validateTeam from '../../utilities/validation/team-validator'
import { ILeague, ITeam } from '../types'
import { checkObjectNullity } from '../../utilities/checkNullity'

export async function getTeam (req: Request, res: Response): Promise<void> {
  try {
    const { leagueId } = req.params
    const teamIdentifier = req.query.tid as string
    const league: ILeague | null = await Leagues.findOne(
      { _id: leagueId, 'teams.teamId': teamIdentifier },
      { 'teams.$': 1 }
    )
    let team: ITeam | null = null
    if (league !== null) team = league.teams[0]
    team = checkObjectNullity<ITeam>(team)
    if (team !== null) {
      res.status(200).json({ data: team })
      return
    }
    res.status(400).json({ error: 'Data error, team wasn\'t searched' })
  } catch (error) {
    res.status(500).json({ error: (error as Error)?.message })
  }
}

export async function createTeam (req: Request, res: Response): Promise<void> {
  try {
    const { leagueId } = req.params
    const typedBody: ITeam = req.body
    const data = validateTeam({ ...typedBody, teamId: typedBody.teamId.toUpperCase() })
    const doesTeamExist = await isExistingId({ leagueId, teamId: data.teamId })
    if (doesTeamExist) {
      res.status(400).json({ error: `A team already got ${data.teamId} as id, try another one` })
      return
    }
    let league: ILeague | null = await Leagues.findByIdAndUpdate(
      { _id: leagueId },
      { $addToSet: { teams: { ...data } } },
      { new: true }
    )
    league = checkObjectNullity<ILeague>(league)
    if (league !== null) {
      res.status(200).json({ data: `${data.name} has been created` })
      return
    }
    res.status(400).json({ error: 'Data error, team wasn\'t created' })
  } catch (error) {
    res.status(500).json({ error: (error as Error)?.message })
  }
}

export async function updateTeam (req: Request, res: Response): Promise<void> {
  try {
    const { leagueId } = req.params
    const teamIdentifier = req.query.tid as string
    const data = validateTeam({ ...req.body })
    let league: ILeague | null = await Leagues.findByIdAndUpdate(
      { _id: leagueId },
      { $set: { 'teams.$[elem]': { ...data } } },
      { new: true, arrayFilters: [{ 'elem.teamId': teamIdentifier }] }
    )
    league = checkObjectNullity<ILeague>(league)
    if (league !== null) {
      res.status(200).json({ data: `${data.name} has been updated` })
      return
    }
    res.status(400).json({ error: 'Data error, team wasn\'t updated' })
  } catch (error) {
    res.status(500).json({ error: (error as Error)?.message })
  }
}

export async function deleteTeam (req: Request, res: Response): Promise<void> {
  try {
    const { leagueId } = req.params
    const teamIdentifier = req.query.tid as string
    let league: ILeague | null = await Leagues.findByIdAndUpdate(
      { _id: leagueId },
      { $pull: { teams: { teamId: teamIdentifier } } },
      { new: true }
    )
    league = checkObjectNullity<ILeague>(league)
    if (league !== null) {
      res.status(200).json({ data: `Team identified by ${teamIdentifier} from ${league.name} has been deleted` })
      return
    }
    res.status(400).json({ error: 'Data error, team wasn\'t deleted' })
  } catch (error) {
    res.status(500).json({ error: (error as Error)?.message })
  }
}

async function isExistingId ({ leagueId, teamId }: { leagueId: string, teamId: string }): Promise<boolean> {
  const teamExist: ILeague | null = await Leagues.findOne({ _id: leagueId, 'teams.teamId': teamId })
  return teamExist !== null
}

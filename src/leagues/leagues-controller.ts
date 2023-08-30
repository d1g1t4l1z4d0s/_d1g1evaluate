import { Request, Response } from 'express'
import validateLeague from '../utilities/validation/league-validator'
import Leagues from './leagues-model'
import { ILeague } from './types'
import { checkArrayNullity, checkObjectNullity } from '../utilities/checkNullity'

export async function getLeagues (req: Request, res: Response): Promise<void> {
  try {
    let leagues: ILeague[] | null = await Leagues.find({})
    leagues = checkArrayNullity<ILeague>(leagues)
    if (leagues !== null) {
      res.status(200).json({ data: leagues })
      return
    }
    res.status(400).json({ error: 'There is no league available' })
  } catch (error) {
    res.status(500).json({ error: (error as Error)?.message })
  }
}

export async function getLeague (req: Request, res: Response): Promise<void> {
  try {
    const _id = req.params.leagueId
    let league: ILeague | null = await Leagues.findOne({ _id })
    league = checkObjectNullity<ILeague>(league)
    if (league !== null) {
      res.status(200).json({ data: league })
      return
    }
    res.status(400).json({ error: 'Data error, league wasn\'t searched' })
  } catch (error) {
    res.status(500).json({ error: (error as Error)?.message })
  }
}

export async function createLeague (req: Request, res: Response): Promise<void> {
  try {
    const data = validateLeague({ ...req.body })
    let league: ILeague | null = await Leagues.create(data)
    league = checkObjectNullity<ILeague>(league)
    if (league !== null) {
      res.status(200).json({ data: `The league ${data.name} has been created.` })
      return
    }
    res.status(400).json({ error: 'Data error, league wasn\'t created' })
  } catch (error) {
    res.status(500).json({ error: (error as Error)?.message })
  }
}

export async function updateLeague (req: Request, res: Response): Promise<void> {
  try {
    const _id = req.params.leagueId
    const data = validateLeague({ ...req.body })
    let league: ILeague | null = await Leagues.findByIdAndUpdate({ _id }, { $set: { ...data } }, { new: true })
    league = checkObjectNullity<ILeague>(league)
    if (league !== null) {
      res.status(200).json({ data: `The league ${data.name} has been updated.` })
      return
    }
    res.status(400).json({ error: 'Data error, league wasn\'t updated' })
  } catch (error) {
    res.status(500).json({ error: (error as Error)?.message })
  }
}

export async function deleteLeague (req: Request, res: Response): Promise<void> {
  try {
    const _id = req.params.leagueId
    let league: ILeague | null = await Leagues.findByIdAndDelete({ _id }, { new: true })
    league = checkObjectNullity<ILeague>(league)
    if (league !== null) {
      res.status(200).json({ data: `The league identified as ${league._id} has been deleted.` })
      return
    }
    res.status(400).json({ error: 'Data error, league wasn\'t deleted' })
  } catch (error) {
    res.status(500).json({ error: (error as Error)?.message })
  }
}

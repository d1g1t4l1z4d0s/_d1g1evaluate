import Joi from 'joi'
import { ILeague, ITeam } from '../../leagues/types'
import { TeamSchema } from './team-validator'

const LeagueSchema = Joi.object<ILeague>({
  name: Joi.string().min(2).required(),
  currentChampion: Joi.string(),
  logo: Joi.string().required(),
  teams: Joi.array<ITeam>().items(TeamSchema)
})

export default function validateLeague (league: ILeague): ILeague {
  const { error, value } = LeagueSchema.validate(league, { abortEarly: false })
  if (error != null) throw error
  return value
}

import Joi from 'joi'
import { ITeam, IStats, IReliablePerformance, IHighBlock, IMidBlock, ILowBlock, IGoalkeeper } from '../../leagues/types'

const ReliablePerformanceSchema = Joi.object<IReliablePerformance>({
  goalkeeper: Joi.object<IGoalkeeper>({
    name: Joi.string().min(2).required(),
    caughtBalls: Joi.number().min(0).required(),
    concededGoals: Joi.number().min(0).required(),
    cleanSheets: Joi.number().min(0).required()
  }).required(),
  lowBlock: Joi.object<ILowBlock>({
    name: Joi.string().min(2).required(),
    tackles: Joi.number().min(0).required(),
    behavior: Joi.string().valid('good', 'regular', 'bad').required()
  }).required(),
  midBlock: Joi.object<IMidBlock>({
    name: Joi.string().min(2).required(),
    completedPasses: Joi.number().min(0).required(),
    assists: Joi.number().min(0).required()
  }).required(),
  highBlock: Joi.object<IHighBlock>({
    name: Joi.string().min(2).required(),
    scoredGoals: Joi.number().min(0).required(),
    shotsOnTarget: Joi.number().min(0).required()
  }).required()
})

const StatsSchema = Joi.object<IStats>({
  scoredGoals: Joi.number().min(0).required(),
  goalsAgainst: Joi.number().min(0).required(),
  goalBalance: Joi.number().required(),
  yellowCards: Joi.number().min(0).required(),
  redCards: Joi.number().min(0).required(),
  matches: Joi.number().min(0).required(),
  wins: Joi.number().min(0).required(),
  draws: Joi.number().min(0).required(),
  losses: Joi.number().min(0).required(),
  pointsAverage: Joi.number().required(),
  reliablePerformance: ReliablePerformanceSchema.required()
})

export const TeamSchema = Joi.object<ITeam>({
  teamId: Joi.string().min(2).max(3).required(),
  name: Joi.string().min(2).required(),
  manager: Joi.string().min(2).required(),
  logo: Joi.string().required(),
  stats: StatsSchema.required()
})

export default function validateTeam (team: ITeam): ITeam {
  const { error, value } = TeamSchema.validate(team, { abortEarly: false })
  if (error != null) throw error
  return value
}

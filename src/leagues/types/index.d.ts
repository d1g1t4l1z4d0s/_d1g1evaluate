export interface IGoalkeeper {
  name: string
  caughtBalls: number
  concededGoals: number
  cleanSheets: number
}

export interface ILowBlock {
  name: string
  tackles: number
  behavior: 'good' | 'regular' | 'bad'
}
export interface IMidBlock {
  name: string
  completedPasses: number
  assists: number
}

export interface IHighBlock {
  name: string
  scoredGoals: number
  shotsOnTarget: number
}

export interface IReliablePerformance {
  goalkeeper: IGoalkeeper
  lowBlock: ILowBlock
  midBlock: IMidBlock
  highBlock: IHighBlock
}

export interface IStats {
  scoredGoals: number
  goalsAgainst: number
  goalBalance: number
  yellowCards: number
  redCards: number
  matches: number
  wins: number
  draws: number
  losses: number
  pointsAverage: number
  reliablePerformance: IReliablePerformance
}

export interface ITeam {
  teamId: string
  name: string
  manager: string
  logo: string
  stats: IStats
}

export interface ILeague {
  _id: string
  name: string
  currentChampion?: string
  logo: string
  teams: ITeam[]
}

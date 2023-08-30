import { Document } from 'mongoose'
import { ILeague } from '.'

export interface LeagueModel extends ILeague, Document { }

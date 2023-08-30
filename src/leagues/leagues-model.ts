import { model, Schema } from 'mongoose'
import { LeagueModel } from './types/model'

const LeagueSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  currentChampion: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  teams: {
    type: Array,
    required: true
  }
}, { versionKey: false })

export default model<LeagueModel>('league', LeagueSchema)

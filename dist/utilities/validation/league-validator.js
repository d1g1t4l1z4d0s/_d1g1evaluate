"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const team_validator_1 = require("./team-validator");
const LeagueSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).required(),
    currentChampion: joi_1.default.string(),
    logo: joi_1.default.string().required(),
    teams: joi_1.default.array().items(team_validator_1.TeamSchema)
});
function validateLeague(league) {
    const { error, value } = LeagueSchema.validate(league, { abortEarly: false });
    if (error != null)
        throw error;
    return value;
}
exports.default = validateLeague;

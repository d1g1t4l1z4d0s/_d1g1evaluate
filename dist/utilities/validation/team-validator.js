"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const ReliablePerformanceSchema = joi_1.default.object({
    goalkeeper: joi_1.default.object({
        name: joi_1.default.string().min(2).required(),
        caughtBalls: joi_1.default.number().min(0).required(),
        concededGoals: joi_1.default.number().min(0).required(),
        cleanSheets: joi_1.default.number().min(0).required()
    }).required(),
    lowBlock: joi_1.default.object({
        name: joi_1.default.string().min(2).required(),
        tackles: joi_1.default.number().min(0).required(),
        behavior: joi_1.default.string().valid('good', 'regular', 'bad').required()
    }).required(),
    midBlock: joi_1.default.object({
        name: joi_1.default.string().min(2).required(),
        completedPasses: joi_1.default.number().min(0).required(),
        assists: joi_1.default.number().min(0).required()
    }).required(),
    highBlock: joi_1.default.object({
        name: joi_1.default.string().min(2).required(),
        scoredGoals: joi_1.default.number().min(0).required(),
        shotsOnTarget: joi_1.default.number().min(0).required()
    }).required()
});
const StatsSchema = joi_1.default.object({
    scoredGoals: joi_1.default.number().min(0).required(),
    goalsAgainst: joi_1.default.number().min(0).required(),
    goalBalance: joi_1.default.number().required(),
    yellowCards: joi_1.default.number().min(0).required(),
    redCards: joi_1.default.number().min(0).required(),
    matches: joi_1.default.number().min(0).required(),
    wins: joi_1.default.number().min(0).required(),
    draws: joi_1.default.number().min(0).required(),
    losses: joi_1.default.number().min(0).required(),
    pointsAverage: joi_1.default.number().required(),
    reliablePerformance: ReliablePerformanceSchema.required()
});
exports.TeamSchema = joi_1.default.object({
    teamId: joi_1.default.string().min(2).max(3).required(),
    name: joi_1.default.string().min(2).required(),
    manager: joi_1.default.string().min(2).required(),
    logo: joi_1.default.string().required(),
    stats: StatsSchema.required()
});
function validateTeam(team) {
    const { error, value } = exports.TeamSchema.validate(team, { abortEarly: false });
    if (error != null)
        throw error;
    return value;
}
exports.default = validateTeam;

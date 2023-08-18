"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeam = exports.updateTeam = exports.createTeam = exports.getTeam = void 0;
const leagues_model_1 = __importDefault(require("../leagues-model"));
const team_validator_1 = __importDefault(require("../../utilities/validation/team-validator"));
const checkNullity_1 = require("../../utilities/checkNullity");
function getTeam(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { leagueId } = req.params;
            const teamIdentifier = req.query.tid;
            const league = yield leagues_model_1.default.findOne({ _id: leagueId, 'teams.teamId': teamIdentifier }, { 'teams.$': 1 });
            let team = null;
            if (league !== null)
                team = league.teams[0];
            team = (0, checkNullity_1.checkObjectNullity)(team);
            if (team !== null) {
                res.status(200).json({ data: team });
                return;
            }
            res.status(400).json({ error: 'Data error, team wasn\'t searched' });
        }
        catch (error) {
            res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
        }
    });
}
exports.getTeam = getTeam;
function createTeam(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { leagueId } = req.params;
            const typedBody = req.body;
            const data = (0, team_validator_1.default)(Object.assign(Object.assign({}, typedBody), { teamId: typedBody.teamId.toUpperCase() }));
            const doesTeamExist = yield isExistingId({ leagueId, teamId: data.teamId });
            if (doesTeamExist) {
                res.status(400).json({ error: `A team already got ${data.teamId} as id, try another one` });
                return;
            }
            let league = yield leagues_model_1.default.findByIdAndUpdate({ _id: leagueId }, { $addToSet: { teams: Object.assign({}, data) } }, { new: true });
            league = (0, checkNullity_1.checkObjectNullity)(league);
            if (league !== null) {
                res.status(200).json({ data: `${data.name} has been created` });
                return;
            }
            res.status(400).json({ error: 'Data error, team wasn\'t created' });
        }
        catch (error) {
            res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
        }
    });
}
exports.createTeam = createTeam;
function updateTeam(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { leagueId } = req.params;
            const teamIdentifier = req.query.tid;
            const data = (0, team_validator_1.default)(Object.assign({}, req.body));
            let league = yield leagues_model_1.default.findByIdAndUpdate({ _id: leagueId }, { $set: { 'teams.$[elem]': Object.assign({}, data) } }, { new: true, arrayFilters: [{ 'elem.teamId': teamIdentifier }] });
            league = (0, checkNullity_1.checkObjectNullity)(league);
            if (league !== null) {
                res.status(200).json({ data: `${data.name} has been updated` });
                return;
            }
            res.status(400).json({ error: 'Data error, team wasn\'t updated' });
        }
        catch (error) {
            res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
        }
    });
}
exports.updateTeam = updateTeam;
function deleteTeam(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { leagueId } = req.params;
            const teamIdentifier = req.query.tid;
            let league = yield leagues_model_1.default.findByIdAndUpdate({ _id: leagueId }, { $pull: { teams: { teamId: teamIdentifier } } }, { new: true });
            league = (0, checkNullity_1.checkObjectNullity)(league);
            if (league !== null) {
                res.status(200).json({ data: `Team identified by ${teamIdentifier} from ${league.name} has been deleted` });
                return;
            }
            res.status(400).json({ error: 'Data error, team wasn\'t deleted' });
        }
        catch (error) {
            res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
        }
    });
}
exports.deleteTeam = deleteTeam;
function isExistingId({ leagueId, teamId }) {
    return __awaiter(this, void 0, void 0, function* () {
        const teamExist = yield leagues_model_1.default.findOne({ _id: leagueId, 'teams.teamId': teamId });
        return teamExist !== null;
    });
}

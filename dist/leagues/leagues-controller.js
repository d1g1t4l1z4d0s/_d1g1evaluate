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
exports.deleteLeague = exports.updateLeague = exports.createLeague = exports.getLeague = exports.getLeagues = void 0;
const league_validator_1 = __importDefault(require("../utilities/validation/league-validator"));
const leagues_model_1 = __importDefault(require("./leagues-model"));
const checkNullity_1 = require("../utilities/checkNullity");
function getLeagues(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let leagues = yield leagues_model_1.default.find({});
            leagues = (0, checkNullity_1.checkArrayNullity)(leagues);
            if (leagues !== null) {
                res.status(200).json({ data: leagues });
                return;
            }
            res.status(400).json({ error: 'There is no league available' });
        }
        catch (error) {
            res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
        }
    });
}
exports.getLeagues = getLeagues;
function getLeague(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const _id = req.params.leagueId;
            let league = yield leagues_model_1.default.findOne({ _id });
            league = (0, checkNullity_1.checkObjectNullity)(league);
            if (league !== null) {
                res.status(200).json({ data: league });
                return;
            }
            res.status(400).json({ error: 'Data error, league wasn\'t searched' });
        }
        catch (error) {
            res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
        }
    });
}
exports.getLeague = getLeague;
function createLeague(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = (0, league_validator_1.default)(Object.assign({}, req.body));
            let league = yield leagues_model_1.default.create(data);
            league = (0, checkNullity_1.checkObjectNullity)(league);
            if (league !== null) {
                res.status(200).json({ data: `The league ${data.name} has been created.` });
                return;
            }
            res.status(400).json({ error: 'Data error, league wasn\'t created' });
        }
        catch (error) {
            res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
        }
    });
}
exports.createLeague = createLeague;
function updateLeague(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const _id = req.params.leagueId;
            const data = (0, league_validator_1.default)(Object.assign({}, req.body));
            let league = yield leagues_model_1.default.findByIdAndUpdate({ _id }, { $set: Object.assign({}, data) }, { new: true });
            league = (0, checkNullity_1.checkObjectNullity)(league);
            if (league !== null) {
                res.status(200).json({ data: `The league ${data.name} has been updated.` });
                return;
            }
            res.status(400).json({ error: 'Data error, league wasn\'t updated' });
        }
        catch (error) {
            res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
        }
    });
}
exports.updateLeague = updateLeague;
function deleteLeague(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const _id = req.params.leagueId;
            let league = yield leagues_model_1.default.findByIdAndDelete({ _id }, { new: true });
            league = (0, checkNullity_1.checkObjectNullity)(league);
            if (league !== null) {
                res.status(200).json({ data: `The league identified as ${league._id} has been deleted.` });
                return;
            }
            res.status(400).json({ error: 'Data error, league wasn\'t deleted' });
        }
        catch (error) {
            res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
        }
    });
}
exports.deleteLeague = deleteLeague;

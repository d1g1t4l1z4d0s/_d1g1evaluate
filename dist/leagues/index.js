"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = require("express");
const _1 = __importDefault(require("./team/."));
const router = (0, express_1.Router)();
router
    .get('/', (req, res) => {
    Promise.resolve().then(() => __importStar(require('./leagues-controller'))).then((leagueController) => __awaiter(void 0, void 0, void 0, function* () {
        yield leagueController.getLeagues(req, res);
    }))
        .catch(error => {
        const typedError = error;
        const message = typedError.message === '' ? 'Some was wrong with the league controller' : typedError.message;
        res.status(500).json({ error: message });
    });
})
    .get('/:leagueId', (req, res) => {
    Promise.resolve().then(() => __importStar(require('./leagues-controller'))).then((leagueController) => __awaiter(void 0, void 0, void 0, function* () {
        yield leagueController.getLeague(req, res);
    }))
        .catch(error => {
        const typedError = error;
        const message = typedError.message === '' ? 'Some was wrong with the league controller' : typedError.message;
        res.status(500).json({ error: message });
    });
})
    .post('/', (req, res) => {
    Promise.resolve().then(() => __importStar(require('./leagues-controller'))).then((leagueController) => __awaiter(void 0, void 0, void 0, function* () {
        yield leagueController.createLeague(req, res);
    }))
        .catch(error => {
        const typedError = error;
        const message = typedError.message === '' ? 'Some was wrong with the league controller' : typedError.message;
        res.status(500).json({ error: message });
    });
})
    .patch('/:leagueId', (req, res) => {
    Promise.resolve().then(() => __importStar(require('./leagues-controller'))).then((leagueController) => __awaiter(void 0, void 0, void 0, function* () {
        yield leagueController.updateLeague(req, res);
    }))
        .catch(error => {
        const typedError = error;
        const message = typedError.message === '' ? 'Some was wrong with the league controller' : typedError.message;
        res.status(500).json({ error: message });
    });
})
    .delete('/:leagueId', (req, res) => {
    Promise.resolve().then(() => __importStar(require('./leagues-controller'))).then((leagueController) => __awaiter(void 0, void 0, void 0, function* () {
        yield leagueController.deleteLeague(req, res);
    }))
        .catch(error => {
        const typedError = error;
        const message = typedError.message === '' ? 'Some was wrong with the league controller' : typedError.message;
        res.status(500).json({ error: message });
    });
})
    .use('/teams', _1.default);
exports.default = router;

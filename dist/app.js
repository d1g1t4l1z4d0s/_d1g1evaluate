"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const users_1 = __importDefault(require("./users"));
const leagues_1 = __importDefault(require("./leagues"));
const authenticate_1 = require("./middlewares/authenticate");
const app = (0, express_1.default)();
app.set('port', config_1.default.port);
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)({
    origin: ['https://d1g1t4l1z4d0s.github.io/d1g1evaluate/']
}));
app.use(express_1.default.json());
app.use('/api/leagues', authenticate_1.authenticate, leagues_1.default);
app.use('/users', users_1.default);
exports.default = app;

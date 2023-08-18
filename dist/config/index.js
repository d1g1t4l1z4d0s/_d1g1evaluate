"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
dotenv_1.default.config({
    path: (0, path_1.resolve)(__dirname, '../../.env')
});
const mongoDbIn = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://0.0.0.0:27017/d1g1-evaluate';
const config = {
    node_env: process.env.NODE_ENV,
    port: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : '3002',
    mongoDb: {
        mongoUri: mongoDbIn
    },
    jwt: {
        secret: process.env.SECRET
    }
};
exports.default = config;

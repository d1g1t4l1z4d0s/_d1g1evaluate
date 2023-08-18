"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptToken = exports.createSignature = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("../config"));
const createSignature = (payload) => {
    return (0, jsonwebtoken_1.sign)(payload, config_1.default.jwt.secret, { expiresIn: '12h' });
};
exports.createSignature = createSignature;
const decryptToken = (token) => {
    return (0, jsonwebtoken_1.verify)(token, config_1.default.jwt.secret);
};
exports.decryptToken = decryptToken;

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
exports.login = exports.signup = void 0;
const user_validator_1 = require("../utilities/validation/user-validator");
const jwt_1 = require("../utilities/jwt");
const users_model_1 = __importDefault(require("./users-model"));
const checkNullity_1 = require("../utilities/checkNullity");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = (0, user_validator_1.validateUser)(Object.assign(Object.assign({}, req.body), { rol: 'common' }));
        let user = yield users_model_1.default.create(data);
        user = (0, checkNullity_1.checkObjectNullity)(user);
        if (user !== null) {
            const token = (0, jwt_1.createSignature)({ _id: user._id });
            res.cookie('auth-jwt', token);
            res.status(200).json({ username: user.username, rol: user.rol, token });
        }
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = (0, user_validator_1.validateUser)(Object.assign({}, req.body));
        let approvedUser = yield users_model_1.default.login(data);
        approvedUser = (0, checkNullity_1.checkObjectNullity)(approvedUser);
        if (approvedUser !== null) {
            const token = (0, jwt_1.createSignature)({ _id: approvedUser._id });
            res.cookie('auth-jwt', token);
            res.status(200).json({ username: approvedUser.username, rol: approvedUser.rol, token });
        }
        else
            throw new Error('Provided password is wrong');
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.login = login;

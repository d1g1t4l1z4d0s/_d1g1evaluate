"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const joi_1 = __importDefault(require("joi"));
const patterns = {
    password: /^((\w+[?#&$!+|-]+)|([?#&$!+|-]+\w+)).+$/
};
const userValidationSchema = joi_1.default.object({
    username: joi_1.default.string().required().trim().min(5),
    password: joi_1.default.string().regex(patterns.password).required().min(8),
    rol: joi_1.default.string().valid('common', 'super')
});
const validateUser = (user) => {
    const { value, error } = userValidationSchema.validate(user, { abortEarly: false });
    if (typeof error !== 'undefined')
        throw error;
    return value;
};
exports.validateUser = validateUser;

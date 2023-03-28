"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateSchema = exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    password: joi_1.default.string().required().min(8),
    profilePicture: joi_1.default.string(),
    email: joi_1.default.string().email().required(),
});
exports.userUpdateSchema = joi_1.default.object({
    name: joi_1.default.string(),
    password: joi_1.default.string().min(8),
    email: joi_1.default.string().email(),
    profilePicture: joi_1.default.string(),
});

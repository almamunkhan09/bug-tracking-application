"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectSchema = exports.newProjectSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.newProjectSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string(),
    createdById: joi_1.default.string().required(),
    maintainerIds: joi_1.default.array().items(joi_1.default.string()).required(),
});
exports.updateProjectSchema = joi_1.default.object({
    title: joi_1.default.string(),
    description: joi_1.default.string(),
    maintainerIds: joi_1.default.array().items(joi_1.default.string()),
});

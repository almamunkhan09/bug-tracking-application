"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIssueSchema = exports.issueSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.issueSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    status: joi_1.default.string(),
    priority: joi_1.default.string(),
    reporterId: joi_1.default.string().required(),
    assigneeIds: joi_1.default.array().items(joi_1.default.string()).required(),
    relatedProjectIds: joi_1.default.string().required(),
});
exports.updateIssueSchema = joi_1.default.object({
    title: joi_1.default.string(),
    description: joi_1.default.string(),
    status: joi_1.default.string(),
    priority: joi_1.default.string(),
    assigneeIds: joi_1.default.array().items(joi_1.default.string()),
});

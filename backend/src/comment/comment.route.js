"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comments = void 0;
const express_1 = require("express");
const createCommentHandler_1 = __importDefault(require("./createCommentHandler"));
const deleteCommentHandler_1 = __importDefault(require("./deleteCommentHandler"));
const updateCommentHandler_1 = __importDefault(require("./updateCommentHandler"));
exports.comments = (0, express_1.Router)();
exports.comments.post('/', createCommentHandler_1.default);
// comments.get('/);
exports.comments.put('/:commentId', updateCommentHandler_1.default);
exports.comments.delete('/:commentId', deleteCommentHandler_1.default);

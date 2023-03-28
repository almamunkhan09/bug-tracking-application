"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.issues = void 0;
const express_1 = require("express");
const issue_create_handler_1 = __importDefault(require("./issue-create-handler"));
const issue_delete_handler_1 = __importDefault(require("./issue-delete-handler"));
const issue_get_by_id_1 = __importDefault(require("./issue-get-by-id"));
const issue_middlewares_1 = require("./issue-middlewares");
const issue_update_handler_1 = __importDefault(require("./issue-update-handler"));
exports.issues = (0, express_1.Router)();
exports.issues.post('/', issue_middlewares_1.validateIssue, issue_create_handler_1.default);
exports.issues.get('/:issueId', issue_get_by_id_1.default);
exports.issues.put('/:issueId', issue_middlewares_1.validateUpdateIssue, issue_update_handler_1.default);
exports.issues.delete('/:issueId', issue_delete_handler_1.default);

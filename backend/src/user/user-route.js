"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const express_1 = require("express");
const issue_get_by_assignee_1 = __importDefault(require("../Issue/issue-get-by-assignee"));
const issue_get_by_reporter_id_1 = __importDefault(require("../Issue/issue-get-by-reporter-id"));
const varifyUser_1 = __importDefault(require("../middleWares/varifyUser"));
const prisma_1 = __importDefault(require("../prisma"));
const user_create_handler_1 = __importDefault(require("./user-create-handler"));
const user_created_project_handler_1 = __importDefault(require("./user-created-project-handler"));
const user_delete_handler_1 = __importDefault(require("./user-delete-handler"));
const user_login_handler_1 = __importDefault(require("./user-login-handler"));
const user_middlewares_1 = require("./user-middlewares");
const user_update_handler_1 = __importDefault(require("./user-update-handler"));
exports.users = (0, express_1.Router)();
exports.users.get('/', async (req, res) => {
    try {
        const allUsers = await prisma_1.default.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                isAdmin: true,
                profilePicture: true,
                createdAt: true,
            },
        });
        res.status(200).json(allUsers);
    }
    catch (err) {
        throw new Error(err);
    }
});
exports.users.post('/', user_middlewares_1.userValidate, user_create_handler_1.default);
exports.users.post('/login', user_login_handler_1.default);
exports.users.put('/:id', user_middlewares_1.updateValidate, varifyUser_1.default, user_update_handler_1.default);
exports.users.delete('/:id', varifyUser_1.default, user_delete_handler_1.default);
exports.users.get('/:id/projects', user_created_project_handler_1.default);
exports.users.get('/:id/userissues', issue_get_by_reporter_id_1.default);
exports.users.get('/:id/assignedIssue', issue_get_by_assignee_1.default);

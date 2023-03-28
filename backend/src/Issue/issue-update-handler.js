"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma"));
const issue_services_1 = require("./issue-services");
async function updateIssueHandler(req, res) {
    const issueId = req.params.issueId;
    try {
        const existingIssue = await prisma_1.default.issue.findUnique({
            where: { id: issueId },
        });
        if (!existingIssue) {
            res.status(404).json({ error: 'Issue not found' });
            return;
        }
        const updateData = {
            title: req.body.title ? req.body.title : existingIssue.title,
            description: req.body.description
                ? req.body.description
                : existingIssue.description,
            status: req.body.status ? req.body.status : existingIssue.status,
            priority: req.body.priority ? req.body.priority : existingIssue.priority,
            assigneeIds: req.body.assigneeIds
                ? req.body.assigneeIds
                : existingIssue.assigneeIds,
        };
        const result = await (0, issue_services_1.updateIssue)(issueId, updateData);
        const response = Object.assign(Object.assign({}, result), { message: 'Issue updated Succefully' });
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
exports.default = updateIssueHandler;

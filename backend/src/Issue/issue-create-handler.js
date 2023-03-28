"use strict";
// src/routes/createIssue.ts
Object.defineProperty(exports, "__esModule", { value: true });
const issue_services_1 = require("./issue-services");
async function createIssueHandler(req, res) {
    const { title, description, status, priority, reporterId, assigneeIds, relatedProjectIds, } = req.body;
    try {
        const result = await (0, issue_services_1.createIssue)({
            title,
            description,
            status,
            priority,
            reporterId,
            assigneeIds,
            relatedProjectIds,
        });
        const response = Object.assign(Object.assign({}, result), { message: 'Issue created Succefully' });
        res.status(201).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
exports.default = createIssueHandler;

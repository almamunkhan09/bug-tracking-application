"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const issue_services_1 = require("./issue-services");
async function getAssignedIssues(req, res) {
    const userId = req.params.userId;
    try {
        const assignedIssues = await (0, issue_services_1.issueAssignedTo)(userId);
        res.status(200).json(assignedIssues);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
exports.default = getAssignedIssues;

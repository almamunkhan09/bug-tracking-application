"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const issue_services_1 = require("./issue-services");
async function getIssueByIssueId(req, res) {
    const issueId = req.params.issueId;
    try {
        const issue = await (0, issue_services_1.issueByIssueId)(issueId);
        if (!issue) {
            res.status(404).json({ error: 'Issue not found' });
            return;
        }
        res.status(200).json(issue);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
exports.default = getIssueByIssueId;

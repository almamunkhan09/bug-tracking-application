"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const issue_services_1 = require("./issue-services");
async function getIssuesByReporter(req, res) {
    const reporterId = req.params.reporterId;
    try {
        const issues = await (0, issue_services_1.issueByReportedId)(reporterId);
        res.status(200).json(issues);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
exports.default = getIssuesByReporter;

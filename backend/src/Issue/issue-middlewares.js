"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateIssue = exports.validateIssue = void 0;
const issue_schema_1 = require("./issue-schema");
const validateIssue = async (req, res, next) => {
    try {
        await issue_schema_1.issueSchema.validateAsync(req.body);
        next();
    }
    catch (err) {
        console.log(err);
        res.status(422).json({ message: 'Input is not valid' });
    }
};
exports.validateIssue = validateIssue;
const validateUpdateIssue = async (req, res, next) => {
    try {
        await issue_schema_1.updateIssueSchema.validateAsync(req.body);
        next();
    }
    catch (err) {
        res.status(422).json({ message: 'Input is not valid' });
    }
};
exports.validateUpdateIssue = validateUpdateIssue;

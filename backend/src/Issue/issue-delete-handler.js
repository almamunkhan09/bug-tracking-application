"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma"));
async function deleteIssue(req, res) {
    const issueId = req.params.issueId;
    console.log(issueId);
    try {
        console.log(issueId);
        const existingIssue = await prisma_1.default.issue.findUnique({
            where: { id: issueId },
        });
        console.log(existingIssue);
        if (!existingIssue) {
            res.status(404).json({ error: 'Issue not found' });
            return;
        }
        await prisma_1.default.issue.delete({
            where: {
                id: issueId,
            },
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
exports.default = deleteIssue;

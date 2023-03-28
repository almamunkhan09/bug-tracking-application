"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma"));
async function updateComment(req, res) {
    const commentId = req.params.commentId;
    const { content } = req.body;
    try {
        const existingComment = await prisma_1.default.comment.findUnique({
            where: { id: commentId },
        });
        if (!existingComment) {
            res.status(404).json({ error: 'Comment not found' });
            return;
        }
        const updatedComment = await prisma_1.default.comment.update({
            where: {
                id: commentId,
            },
            data: {
                content,
            },
        });
        res.status(200).json(updatedComment);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
exports.default = updateComment;

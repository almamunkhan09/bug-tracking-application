"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma"));
async function deleteComment(req, res) {
    const commentId = req.params.commentId;
    try {
        const existingComment = await prisma_1.default.comment.findUnique({
            where: { id: commentId },
        });
        if (!existingComment) {
            res.status(404).json({ error: 'Comment not found' });
            return;
        }
        await prisma_1.default.comment.delete({
            where: {
                id: commentId,
            },
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
exports.default = deleteComment;

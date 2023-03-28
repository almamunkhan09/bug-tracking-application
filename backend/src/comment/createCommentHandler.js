"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma"));
async function createComment(req, res) {
    const { content, issueId, commentedById } = req.body;
    try {
        const newComment = await prisma_1.default.comment.create({
            data: {
                content,
                issue: {
                    connect: {
                        id: issueId,
                    },
                },
                commentedBy: {
                    connect: {
                        id: commentedById,
                    },
                },
            },
            include: {
                issue: true,
                commentedBy: true,
            },
        });
        res.status(201).json(newComment);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
exports.default = createComment;

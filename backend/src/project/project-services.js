"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProject = exports.deleteProject = exports.getProject = exports.getProjectById = exports.createProject = void 0;
const prisma_1 = __importDefault(require("../prisma"));
async function createProject(inputData) {
    return await prisma_1.default.project.create({
        data: {
            title: inputData.title,
            description: inputData.description,
            createdBy: {
                connect: {
                    id: inputData.createdById,
                },
            },
            maintainers: {
                connect: inputData.maintainerIds.map((userId) => ({
                    id: userId,
                })),
            },
        },
        include: {
            createdBy: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    profilePicture: true,
                },
            },
            maintainers: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    profilePicture: true,
                },
            },
        },
    });
}
exports.createProject = createProject;
async function getProjectById(id) {
    return await prisma_1.default.project.findUnique({
        where: { id },
        include: {
            createdBy: {
                select: {
                    id: true,
                    name: true,
                    profilePicture: true,
                    email: true,
                },
            },
            maintainers: {
                select: {
                    id: true,
                    name: true,
                    profilePicture: true,
                    email: true,
                },
            },
            issues: true,
        },
    });
}
exports.getProjectById = getProjectById;
async function getProject(id) {
    return await prisma_1.default.project.findUnique({
        where: { id },
    });
}
exports.getProject = getProject;
async function deleteProject(id) {
    return await prisma_1.default.project.delete({
        where: { id },
        select: {
            id: true,
            title: true,
        },
    });
}
exports.deleteProject = deleteProject;
async function updateProject(id, updateData) {
    return await prisma_1.default.project.update({
        where: { id },
        data: {
            title: updateData.title,
            description: updateData.description,
            maintainers: updateData.maintainerIds.length > 0
                ? {
                    set: updateData.maintainerIds.map((userId) => ({
                        id: userId,
                    })),
                }
                : undefined,
        },
        include: {
            createdBy: {
                select: {
                    id: true,
                    name: true,
                    profilePicture: true,
                    email: true,
                },
            },
            maintainers: {
                select: {
                    id: true,
                    name: true,
                    profilePicture: true,
                    email: true,
                },
            },
        },
    });
}
exports.updateProject = updateProject;

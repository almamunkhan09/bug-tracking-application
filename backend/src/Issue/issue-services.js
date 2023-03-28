"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteIssue = exports.issueAssignedTo = exports.issueByReportedId = exports.issueByIssueId = exports.updateIssue = exports.createIssue = void 0;
const prisma_1 = __importDefault(require("../prisma"));
/**
 * Create Issue in a project and assign members to it.
 *
 * @param title is the title of the Issue
 * @param description is the description of the Issue
 * @param status may be open or closed
 * @param priority may be low,medium or high
 * @param reporterId is the user id who repoted the issue
 * @param assigneeIds ware the user ids whom the issue is assigned
 * @param relatedProjectIds the project under which the issue is reported
 * @returns the square object data of user i.e id,email,name and profile picture.
 */
async function createIssue({ title, description, status, priority, reporterId, assigneeIds, relatedProjectIds, }) {
    return await prisma_1.default.issue.create({
        data: {
            title,
            description,
            status: status || 'open',
            priority: priority || 'low',
            reporter: { connect: { id: reporterId } },
            assignees: { connect: assigneeIds.map((id) => ({ id })) },
            relatedProject: { connect: { id: relatedProjectIds } },
        },
        include: {
            reporter: {
                select: {
                    name: true,
                },
            },
            assignees: {
                select: {
                    name: true,
                },
            },
            relatedProject: true,
        },
    });
}
exports.createIssue = createIssue;
/**
 * Create Issue in a project and assign members to it.
 *
 * @param title is the title of the Issue
 * @param description is the description of the Issue
 * @param status may be open or closed
 * @param priority may be low,medium or high
 * @param assigneeIds ware the user ids whom the issue is assigned
 * @returns the square object data of user i.e id,email,name and profile picture.
 */
async function updateIssue(issueId, { title, description, status, priority, assigneeIds }) {
    return await prisma_1.default.issue.update({
        where: {
            id: issueId,
        },
        data: {
            title: title,
            description: description,
            status: status,
            priority: priority,
            assignees: assigneeIds
                ? {
                    set: assigneeIds.map((userId) => ({
                        id: userId,
                    })),
                }
                : undefined,
        },
        include: {
            reporter: {
                select: {
                    name: true,
                    id: true,
                    profilePicture: true,
                },
            },
            assignees: {
                select: {
                    name: true,
                    id: true,
                    profilePicture: true,
                },
            },
            relatedProject: true,
        },
    });
}
exports.updateIssue = updateIssue;
/**
 * Get issue details by the issue id
 *
 * @param issueId is the title of the Issue
 *
 * @returns  object of the issue deails inclduing assignees and related project
 */
async function issueByIssueId(issueId) {
    return await prisma_1.default.issue.findUnique({
        where: {
            id: issueId,
        },
        include: {
            reporter: {
                select: {
                    name: true,
                    id: true,
                    profilePicture: true,
                    email: true,
                },
            },
            assignees: {
                select: {
                    name: true,
                    id: true,
                    profilePicture: true,
                    email: true,
                },
            },
            relatedProject: {
                select: {
                    title: true,
                    description: true,
                    maintainers: {
                        select: {
                            name: true,
                            email: true,
                            id: true,
                            profilePicture: true,
                        },
                    },
                },
            },
            comments: true,
        },
    });
}
exports.issueByIssueId = issueByIssueId;
/**
 * Get issue by the reporter id
 *
 * @param reporterId who reported be the issue
 *
 * @returns  object of the issues reported by a user
 */
async function issueByReportedId(reporterId) {
    return await prisma_1.default.issue.findMany({
        where: {
            reporterId,
        },
        include: {
            reporter: { select: { name: true } },
            assignees: { select: { name: true } },
            relatedProject: { select: { title: true } },
        },
    });
}
exports.issueByReportedId = issueByReportedId;
/**
 * Get issue by the reporter id
 *
 * @param assineeId who reported be the issue
 *
 * @returns  object of the issues assigned to a  user
 */
async function issueAssignedTo(assigneeId) {
    return await prisma_1.default.issue.findMany({
        where: {
            assignees: {
                some: {
                    id: assigneeId,
                },
            },
        },
        include: {
            reporter: { select: { name: true } },
            assignees: { select: { name: true } },
            relatedProject: { select: { title: true } },
        },
    });
}
exports.issueAssignedTo = issueAssignedTo;
async function deleteIssue(issueId) {
    return await prisma_1.default.issue.delete({
        where: {
            id: issueId,
        },
    });
}
exports.deleteIssue = deleteIssue;

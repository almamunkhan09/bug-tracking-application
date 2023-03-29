import prisma from '../../prisma';
import { NewIssue, UpdateIssueData } from './issue-types';

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

export async function createIssue({
  title,
  description,
  status,
  priority,
  reporterId,
  assigneeIds,
  relatedProjectIds,
}: NewIssue) {
  return await prisma.issue.create({
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

export async function updateIssue(
  issueId: string,
  { title, description, status, priority, assigneeIds }: UpdateIssueData,
) {
  return await prisma.issue.update({
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
            set: assigneeIds.map((userId: string) => ({
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

/**
 * Get issue details by the issue id
 *
 * @param issueId is the title of the Issue
 *
 * @returns  object of the issue deails inclduing assignees and related project
 */
export async function issueByIssueId(issueId: string) {
  return await prisma.issue.findUnique({
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

/**
 * Get issue by the reporter id
 *
 * @param reporterId who reported be the issue
 *
 * @returns  object of the issues reported by a user
 */
export async function issueByReportedId(reporterId: string) {
  return await prisma.issue.findMany({
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

/**
 * Get issue by the reporter id
 *
 * @param assineeId who reported be the issue
 *
 * @returns  object of the issues assigned to a  user
 */
export async function issueAssignedTo(assigneeId: string) {
  return await prisma.issue.findMany({
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

export async function deleteIssue(issueId: string) {
  return await prisma.issue.delete({
    where: {
      id: issueId,
    },
  });
}

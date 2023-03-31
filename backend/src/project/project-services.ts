import prisma from '../../prisma';
import { NewProject, UpdateProject } from './project-type';

export async function createProject(inputData: NewProject) {
  return await prisma.project.create({
    data: {
      title: inputData.title,
      description: inputData.description,
      createdBy: {
        connect: {
          id: inputData.createdById,
        },
      },
      maintainers: {
        connect: inputData.maintainerIds.map((userId: string) => ({
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

export async function getProjectById(id: string) {
  return await prisma.project.findUnique({
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
      issues: {
        select: {
          id: true,
          title: true,
          status: true,
          priority: true,
          reporter: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
}

export async function getProject(id: string) {
  return await prisma.project.findUnique({
    where: { id },
  });
}

export async function deleteProject(id: string) {
  return await prisma.project.delete({
    where: { id },
    select: {
      id: true,
      title: true,
    },
  });
}

export async function updateProject(id: string, updateData: UpdateProject) {
  return await prisma.project.update({
    where: { id },
    data: {
      title: updateData.title,
      description: updateData.description,
      maintainers:
        updateData.maintainerIds.length > 0
          ? {
              set: updateData.maintainerIds.map((userId: string) => ({
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

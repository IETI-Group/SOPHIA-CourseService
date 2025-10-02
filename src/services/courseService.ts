import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CourseService = {
  getAll: async () => {
    return prisma.course.findMany({
      include: {
        category: true,
        sections: true,
      },
    });
  },

  getById: async (id: number) => {
    return prisma.course.findUnique({
      where: { id },
      include: {
        category: true,
        sections: {
          include: { lessons: true },
        },
      },
    });
  },

  create: async (data: any) => {
    return prisma.course.create({
      data,
    });
  },

  update: async (id: number, data: any) => {
    return prisma.course.update({
      where: { id },
      data,
    });
  },

  delete: async (id: number) => {
    return prisma.course.delete({
      where: { id },
    });
  },
};

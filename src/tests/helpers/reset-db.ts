import { PrismaClient } from "@prisma/client";

const prismaclient = new PrismaClient();

export const resetDB = async () => {
  await prismaclient.$transaction([prismaclient.request.deleteMany()]);
};
